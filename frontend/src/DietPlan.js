import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const icons = ["🥗", "💧", "🍎", "🥦", "🏃", "🫀", "😴", "🧘", "🍳", "🥑"];

const DietPlan = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [dietPlan, setDietPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/fitness/generate-diet-plan/${email}`)
      .then(res => setDietPlan(res.data.dietPlan || []))
      .catch(err => setError(err.response?.data?.message || "Failed to generate diet plan."))
      .finally(() => setLoading(false));
  }, [email]);

  return (
    <div style={s.page}>
      <div style={s.navbar}>
        <div style={s.brand}>🏋️ Fitness Freak</div>
        <button style={s.backBtn} onClick={() => navigate('/homedash')}>← Dashboard</button>
      </div>

      <div style={s.content}>
        <div style={s.header}>
          <h1 style={s.title}>🍽️ Your Personalized Diet Plan</h1>
          <p style={s.sub}>AI-generated based on your last 7 days of real fitness data</p>
        </div>

        {loading && (
          <div style={s.loadingBox}>
            <div style={s.spinner} />
            <p style={s.loadingText}>Analyzing your health data and generating your plan...</p>
          </div>
        )}

        {error && (
          <div style={s.errorBox}>
            <p style={s.errorText}>⚠️ {error}</p>
            <p style={{ color: '#888', fontSize: '14px' }}>Make sure you've saved at least one day of fitness data from the dashboard.</p>
          </div>
        )}

        {!loading && !error && dietPlan.length > 0 && (
          <div style={s.grid}>
            {dietPlan.map((tip, i) => (
              <div key={i} style={s.card}>
                <div style={s.cardIcon}>{icons[i % icons.length]}</div>
                <div style={s.cardNum}>Tip {i + 1}</div>
                <p style={s.cardText}>{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const s = {
  page: { minHeight: '100vh', background: '#f8f9fb', fontFamily: "'Segoe UI', sans-serif" },
  navbar: { background: '#fff', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', position: 'sticky', top: 0, zIndex: 100 },
  brand: { fontSize: '20px', fontWeight: '800', color: '#ff6b00' },
  backBtn: { background: 'transparent', border: '1.5px solid #e0e0e0', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', color: '#555' },
  content: { maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '32px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 8px' },
  sub: { fontSize: '15px', color: '#888' },
  loadingBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '60px 0' },
  spinner: { width: '40px', height: '40px', border: '4px solid #f0f0f0', borderTop: '4px solid #ff6b00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  loadingText: { color: '#888', fontSize: '15px' },
  errorBox: { background: '#fff5f5', border: '1.5px solid #fca5a5', borderRadius: '14px', padding: '24px', textAlign: 'center' },
  errorText: { color: '#dc2626', fontWeight: '600', fontSize: '15px', margin: '0 0 8px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  card: { background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '4px solid #ff6b00' },
  cardIcon: { fontSize: '28px', marginBottom: '8px' },
  cardNum: { fontSize: '11px', fontWeight: '700', color: '#ff6b00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' },
  cardText: { fontSize: '14px', color: '#444', lineHeight: 1.7, margin: 0 },
};

export default DietPlan;
