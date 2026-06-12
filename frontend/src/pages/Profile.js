import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fields = [
  { label: 'First Name', name: 'firstName', type: 'text' },
  { label: 'Phone Number', name: 'phone', type: 'text' },
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Age', name: 'age', type: 'number' },
  { label: 'Height (cm)', name: 'height', type: 'number' },
  { label: 'Weight (kg)', name: 'weight', type: 'number' },
  { label: 'City', name: 'city', type: 'text' },
  { label: 'Country', name: 'country', type: 'text' },
];

const UserProfile = () => {
  const navigate = useNavigate();
  const loggedInEmail = localStorage.getItem('email');
  const [formData, setFormData] = useState({ firstName:'',phone:'',email:'',password:'',city:'',country:'',age:'',gender:'',height:'',weight:'' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (loggedInEmail) {
      axios.get(`http://localhost:5000/user/profile?email=${loggedInEmail}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error(err));
    }
  }, [loggedInEmail]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await axios.put('http://localhost:5000/user/update-profile', formData);
      setFormData(res.data.user);
      setMsg('✅ Profile updated!');
    } catch {
      setMsg('❌ Update failed.');
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(''), 3000);
    }
  };

  return (
    <div style={s.page}>
      {/* Navbar */}
      <div style={s.navbar}>
        <div style={s.brand}>🏋️ Fitness Freak</div>
        <button style={s.backBtn} onClick={() => navigate('/homedash')}>← Back to Dashboard</button>
      </div>

      <div style={s.content}>
        {/* Sidebar */}
        <div style={s.sidebar}>
          <div style={s.avatarWrap}>
            <div style={s.avatar}>{formData.firstName?.[0]?.toUpperCase() || '?'}</div>
          </div>
          <div style={s.sidebarName}>{formData.firstName || 'User'}</div>
          <div style={s.sidebarEmail}>{formData.email}</div>
          <div style={s.sidebarBadge}>🏅 Fitness Enthusiast</div>

          <div style={s.statsBox}>
            {[
              { label: 'Workouts', val: '45', color: '#16a34a' },
              { label: 'Calories Burned', val: '12,500', color: '#ff6b00' },
              { label: 'Weekly Goal', val: '5/7', color: '#7c3aed' },
            ].map(({ label, val, color }) => (
              <div key={label} style={s.statRow}>
                <span style={s.statLabel}>{label}</span>
                <span style={{ ...s.statVal, color }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={s.formCard}>
          <h2 style={s.formTitle}>Account Settings</h2>
          <p style={s.formSub}>Update your personal information</p>

          <div style={s.fieldGrid}>
            {fields.map(({ label, name, type }) => (
              <div key={name} style={s.fieldWrap}>
                <label style={s.label}>{label}</label>
                <input type={type} name={name} value={formData[name] || ''} onChange={handleChange} style={s.input} />
              </div>
            ))}
            <div style={s.fieldWrap}>
              <label style={s.label}>Gender</label>
              <select name="gender" value={formData.gender || ''} onChange={handleChange} style={s.input}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div style={s.actions}>
            <button onClick={handleUpdate} style={s.saveBtn} disabled={saving}>
              {saving ? 'Saving...' : '💾 Save Changes'}
            </button>
            {msg && <span style={s.msg}>{msg}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const s = {
  page: { minHeight: '100vh', background: '#f8f9fb', fontFamily: "'Segoe UI', sans-serif" },
  navbar: { background: '#fff', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', position: 'sticky', top: 0, zIndex: 100 },
  brand: { fontSize: '20px', fontWeight: '800', color: '#ff6b00' },
  backBtn: { background: 'transparent', border: '1.5px solid #e0e0e0', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', color: '#555' },
  content: { maxWidth: '1100px', margin: '32px auto', padding: '0 24px', display: 'flex', gap: '24px', flexWrap: 'wrap' },
  sidebar: { width: '260px', background: '#fff', borderRadius: '16px', padding: '28px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center', flexShrink: 0 },
  avatarWrap: { display: 'flex', justifyContent: 'center', marginBottom: '14px' },
  avatar: { width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b00, #ff9a3c)', color: '#fff', fontSize: '32px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  sidebarName: { fontSize: '18px', fontWeight: '700', color: '#1a1a1a' },
  sidebarEmail: { fontSize: '13px', color: '#888', marginTop: '4px', marginBottom: '10px' },
  sidebarBadge: { display: 'inline-block', background: '#fff7ed', color: '#ff6b00', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', marginBottom: '20px' },
  statsBox: { background: '#f8f9fb', borderRadius: '12px', padding: '16px', textAlign: 'left' },
  statRow: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px' },
  statLabel: { color: '#666' },
  statVal: { fontWeight: '700' },
  formCard: { flex: 1, minWidth: '300px', background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  formTitle: { fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 4px' },
  formSub: { color: '#888', fontSize: '14px', marginBottom: '24px' },
  fieldGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '18px' },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#555' },
  input: { padding: '11px 13px', borderRadius: '10px', border: '1.5px solid #e0e0e0', fontSize: '14px', outline: 'none', background: '#fafafa' },
  actions: { display: 'flex', alignItems: 'center', gap: '14px', marginTop: '24px' },
  saveBtn: { padding: '12px 28px', background: 'linear-gradient(135deg, #ff6b00, #ff9a3c)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' },
  msg: { fontSize: '14px', fontWeight: '600', color: '#16a34a' },
};

export default UserProfile;
