import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const chartConfigs = [
  { key: 'steps', label: 'Steps', color: '#3b82f6', bg: '#eff6ff' },
  { key: 'calories', label: 'Calories (kcal)', color: '#10b981', bg: '#ecfdf5' },
  { key: 'heartRate', label: 'Heart Rate (bpm)', color: '#ef4444', bg: '#fee2e2' },
  { key: 'weight', label: 'Weight (kg)', color: '#8b5cf6', bg: '#ede9fe' },
];

const FitnessHistory = ({ email }) => {
  const navigate = useNavigate();
  const userEmail = email || localStorage.getItem('email');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userEmail) { setError('No email found. Please log in.'); setLoading(false); return; }
    axios.get(`http://localhost:5000/api/fitness/get-fitness-history/${userEmail}`)
      .then(res => setHistory(Array.isArray(res.data) ? res.data : res.data.history || []))
      .catch(() => setError('Failed to fetch fitness history.'))
      .finally(() => setLoading(false));
  }, [userEmail]);

  if (loading) return <div style={s.center}><div style={s.spinner} />Loading history...</div>;
  if (error) return <div style={s.center}><p style={{ color: '#e53935' }}>{error}</p></div>;
  if (!history.length) return <div style={s.center}><p>No fitness data found for the last 7 days.</p></div>;

  const labels = history.map(d => d.date);
  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: '#f0f0f0' } }, x: { grid: { display: false } } } };

  return (
    <div style={s.page}>
      <div style={s.navbar}>
        <div style={s.brand}>🏋️ Fitness Freak</div>
        <button style={s.backBtn} onClick={() => navigate('/homedash')}>← Dashboard</button>
      </div>

      <div style={s.content}>
        <div style={s.header}>
          <h1 style={s.title}>📊 Weekly Fitness History</h1>
          <p style={s.sub}>Your last 7 days at a glance</p>
        </div>

        {/* Charts */}
        <div style={s.chartGrid}>
          {chartConfigs.map(({ key, label, color, bg }) => (
            <div key={key} style={{ ...s.chartCard, background: bg }}>
              <div style={s.chartTitle}>{label}</div>
              <div style={{ height: '200px' }}>
                <Line options={chartOptions} data={{
                  labels,
                  datasets: [{ label, data: history.map(d => d[key]), borderColor: color, backgroundColor: color + '22', fill: true, tension: 0.4, pointBackgroundColor: color }]
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Day cards */}
        <h2 style={s.sectionTitle}>Day-by-Day Breakdown</h2>
        <div style={s.dayGrid}>
          {history.map((entry, idx) => {
            const prev = history[idx - 1];
            const stepDiff = prev ? entry.steps - prev.steps : null;
            return (
              <div key={entry.date} style={s.dayCard}>
                <div style={s.dayDate}>{entry.date}</div>
                <div style={s.dayStats}>
                  {[
                    { icon: '🚶', label: 'Steps', val: `${entry.steps}${stepDiff !== null ? ` (${stepDiff >= 0 ? '+' : ''}${stepDiff})` : ''}` },
                    { icon: '🔥', label: 'Calories', val: `${entry.calories} kcal` },
                    { icon: '❤️', label: 'Heart Rate', val: `${entry.heartRate} bpm` },
                    { icon: '⚖️', label: 'Weight', val: `${entry.weight} kg` },
                    { icon: '😴', label: 'Sleep', val: entry.sleepQuality },
                    { icon: '🍬', label: 'Sugar', val: entry.sugarStatus },
                    { icon: '💓', label: 'BP', val: entry.bpStatus },
                    { icon: '🧈', label: 'Cholesterol', val: entry.cholesterol },
                    { icon: '🏃', label: 'Activity', val: entry.activityLevel },
                  ].map(({ icon, label, val }) => (
                    <div key={label} style={s.dayRow}>
                      <span style={s.dayRowLabel}>{icon} {label}</span>
                      <span style={s.dayRowVal}>{val || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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
  content: { maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '32px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 8px' },
  sub: { fontSize: '15px', color: '#888' },
  chartGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginBottom: '48px' },
  chartCard: { borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  chartTitle: { fontSize: '13px', fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' },
  sectionTitle: { fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '20px' },
  dayGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  dayCard: { background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  dayDate: { fontSize: '15px', fontWeight: '700', color: '#ff6b00', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' },
  dayStats: { display: 'flex', flexDirection: 'column', gap: '6px' },
  dayRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px' },
  dayRowLabel: { color: '#666' },
  dayRowVal: { fontWeight: '600', color: '#1a1a1a' },
  center: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', fontFamily: "'Segoe UI', sans-serif", color: '#888' },
  spinner: { width: '32px', height: '32px', border: '3px solid #f0f0f0', borderTop: '3px solid #ff6b00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
};

export default FitnessHistory;
