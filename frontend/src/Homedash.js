import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const statCards = (steps, heartRate, calories, weight, spo2) => [
  { label: "Steps Today", value: steps ?? "—", unit: "", icon: "🚶", color: "#fff7ed", border: "#ff6b00" },
  { label: "Heart Rate", value: heartRate ?? "—", unit: heartRate ? " bpm" : "", icon: "❤️", color: "#fff0f0", border: "#e53935" },
  { label: "SpO₂", value: spo2 ?? "—", unit: spo2 ? " %" : "", icon: "🩸", color: "#f3f0ff", border: "#7c3aed" },
  { label: "Calories Burned", value: calories ?? "—", unit: calories ? " kcal" : "", icon: "🔥", color: "#fffbeb", border: "#f59e0b" },
  { label: "Weight", value: weight ?? "—", unit: weight ? " kg" : "", icon: "⚖️", color: "#f0fdf4", border: "#16a34a" },
];

function HomeDash() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [calories, setCalories] = useState(null);
  const [weight, setWeight] = useState(null);
  const [spo2, setSpo2] = useState(null);
  const [email, setEmail] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [sleepQuality, setSleepQuality] = useState('');
  const [sugarStatus, setSugarStatus] = useState('');
  const [bpStatus, setBpStatus] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const fetchFitnessData = async (accessToken) => {
    const now = new Date();
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const endTime = now.getTime();
    const data = {
      aggregateBy: [
        { dataTypeName: "com.google.step_count.delta" },
        { dataTypeName: "com.google.heart_rate.bpm" },
        { dataTypeName: "com.google.calories.expended" },
        { dataTypeName: "com.google.weight" },
        { dataTypeName: "com.google.oxygen_saturation" }
      ],
      bucketByTime: { durationMillis: endTime - startTime },
      startTimeMillis: startTime,
      endTimeMillis: endTime
    };
    try {
      const res = await axios.post(
        'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        data,
        { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } }
      );
      const buckets = res.data.bucket || [];
      const getAllPoints = (i) => buckets.flatMap(b => b.dataset?.[i]?.point || []);

      const stepsPoints = getAllPoints(0);
      setSteps(stepsPoints.reduce((s, p) => s + (p.value?.[0]?.intVal || 0), 0));

      const hrPoints = getAllPoints(1);
      const totalHr = hrPoints.reduce((s, p) => s + (p.value?.[0]?.fpVal || 0), 0);
      setHeartRate(hrPoints.length > 0 ? (totalHr / hrPoints.length).toFixed(1) : 0);

      const calPoints = getAllPoints(2);
      setCalories(calPoints.reduce((s, p) => s + (p.value?.[0]?.fpVal || 0), 0).toFixed(2));

      const weightPoints = getAllPoints(3);
      setWeight(weightPoints.length > 0 ? weightPoints[weightPoints.length - 1].value[0].fpVal.toFixed(1) : 0);

      const spo2Points = getAllPoints(4);
      const totalSpo2 = spo2Points.reduce((s, p) => s + (p.value?.[0]?.fpVal || 0), 0);
      setSpo2(spo2Points.length > 0 ? (totalSpo2 / spo2Points.length).toFixed(1) : 0);

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching fitness data:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');
    const userEmail = localStorage.getItem('email');
    if (userEmail) setEmail(userEmail);
    if (token) {
      localStorage.setItem('fitness_token', token);
      window.history.replaceState({}, document.title, "/homedash");
    } else {
      token = localStorage.getItem('fitness_token');
    }
    if (token) {
      fetchFitnessData(token);
      const interval = setInterval(() => {
        const t = localStorage.getItem('fitness_token');
        if (t) fetchFitnessData(t);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSave = async () => {
    if (!email) { setSaveMsg("❌ Email missing."); return; }
    setSaving(true);
    try {
      const res = await axios.post('http://localhost:5000/api/fitness/save-fitness-data', {
        email, date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD in local timezone
        steps, heartRate, calories, weight, spo2,
        sleepQuality, sugarStatus, bpStatus, cholesterol, activityLevel
      });
      setSaveMsg("✅ " + res.data.message);
    } catch (err) {
      const detail = err.response?.data?.detail || err.response?.data?.message || err.message;
      setSaveMsg("❌ Failed: " + detail);
      console.error("Save error:", err.response?.data || err.message);
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(''), 5000);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const cards = statCards(steps, heartRate, calories, weight, spo2);

  return (
    <div style={s.page}>
      {/* Navbar */}
      <div style={s.navbar}>
        <div style={s.brand}>🏋️ Fitness Freak</div>
        <div style={s.navLinks}>
          <button style={s.navBtn} onClick={() => navigate("/food")}>🍎 Food</button>
          <button style={s.navBtn} onClick={() => navigate("/fitnessTrends")}>📈 Trends</button>
          <button style={s.navBtn} onClick={() => window.open("http://localhost:3001", "_blank")}>🤖 AI Chat</button>
          <button style={s.navBtn} onClick={() => navigate("/fitness-history")}>📊 History</button>
          <button style={s.navBtn} onClick={() => navigate("/about")}>ℹ️ About</button>
          <button style={s.navBtnOutline} onClick={() => navigate('/profile')}>👤 {email || 'Profile'}</button>
          <button style={s.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={s.content}>
        {/* Welcome */}
        <div style={s.welcomeBar}>
          <div>
            <h2 style={s.welcomeTitle}>Good {getGreeting()}, {email?.split('@')[0] || 'Athlete'} 👋</h2>
            <p style={s.welcomeSub}>Here's your fitness snapshot for today</p>
          </div>
          <div style={s.syncBadge}>
            🔄 Live sync {lastUpdated ? `· ${lastUpdated}` : ''}
          </div>
        </div>

        {/* Connect Google Fit banner if no token */}
        {!localStorage.getItem('fitness_token') && (
          <div style={s.onboarding}>
            <h3 style={s.onboardingTitle}>👋 Welcome! Let's get your data connected</h3>
            <p style={s.onboardingSub}>Follow these steps to sync your smartwatch data in real time</p>
            <div style={s.steps}>
              {[
                { num: "1", title: "Install Google Fit", desc: "Download the Google Fit app on your Android phone and sign in with your Google account." },
                { num: "2", title: "Connect your smartwatch", desc: "Pair your smartwatch (Wear OS, Fitbit, etc.) with Google Fit via Bluetooth." },
                { num: "3", title: "Authorize this app", desc: "Click the button below to grant Fitness Freak access to read your health data." },
                { num: "4", title: "See live data", desc: "Your steps, heart rate, calories and SpO₂ will appear on this dashboard automatically." },
              ].map(({ num, title, desc }) => (
                <div key={num} style={s.step}>
                  <div style={s.stepNum}>{num}</div>
                  <div>
                    <div style={s.stepTitle}>{title}</div>
                    <div style={s.stepDesc}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button style={s.connectBtn} onClick={() => window.location.href = 'http://localhost:5000/auth/google-auth'}>
              🔗 Connect Google Fit Now
            </button>
          </div>
        )}

        {/* Stat Cards */}
        <div style={s.cardGrid}>
          {cards.map(({ label, value, unit, icon, color, border }) => (
            <div key={label} style={{ ...s.statCard, background: color, borderTop: `4px solid ${border}` }}>
              <div style={s.cardIcon}>{icon}</div>
              <div style={s.cardValue}>{value}{unit}</div>
              <div style={s.cardLabel}>{label}</div>
            </div>
          ))}
        </div>

        {/* Manual inputs */}
        <div style={s.section}>
          <h3 style={s.sectionTitle}>📋 Daily Health Log</h3>
          <div style={s.inputGrid}>
            {[
              { label: "😴 Sleep Quality", val: sleepQuality, set: setSleepQuality, opts: ["Good", "Average", "Poor", "Very Poor"] },
              { label: "🍬 Sugar Status", val: sugarStatus, set: setSugarStatus, opts: ["Normal", "Prediabetic", "Diabetic"] },
              { label: "💓 Blood Pressure", val: bpStatus, set: setBpStatus, opts: ["Normal", "Prehypertension", "Hypertension"] },
              { label: "🧈 Cholesterol", val: cholesterol, set: setCholesterol, opts: ["Normal", "Borderline High", "High"] },
              { label: "🏃 Activity Level", val: activityLevel, set: setActivityLevel, opts: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"] },
            ].map(({ label, val, set, opts }) => (
              <div key={label} style={s.inputCard}>
                <label style={s.inputLabel}>{label}</label>
                <select value={val} onChange={(e) => set(e.target.value)} style={s.select}>
                  <option value="">Select</option>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={s.actions}>
          <button style={s.primaryBtn} onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "💾 Save Today's Data"}
          </button>
          <button style={s.secondaryBtn} onClick={() => navigate(`/diet-plan/${email}`)}>
            🥗 Generate Diet Plan
          </button>
          {saveMsg && <span style={s.saveMsg}>{saveMsg}</span>}
        </div>

        {/* Quick Tips */}
        <div style={s.tipsSection}>
          <h3 style={s.tipsSectionTitle}>💡 Today's Health Tips</h3>
          <div style={s.tipsGrid}>
            {[
              { icon: "💧", tip: "Drink a glass of water every hour to stay hydrated throughout the day." },
              { icon: "🚶", tip: "Take a 5-minute walk after every meal to boost digestion and step count." },
              { icon: "😴", tip: "Aim for 7-9 hours of sleep tonight — it's when your muscles recover." },
              { icon: "🥗", tip: "Fill half your plate with vegetables at every meal for better nutrition." },
            ].map(({ icon, tip }) => (
              <div key={tip} style={s.tipCard}>
                <span style={s.tipIcon}>{icon}</span>
                <span style={s.tipText}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Nav Cards */}
        <div style={s.quickNavSection}>
          <h3 style={s.tipsSectionTitle}>🔗 Quick Access</h3>
          <div style={s.quickNavGrid}>
            {[
              { icon: "📊", label: "Fitness History", desc: "View your 7-day charts", path: "/fitness-history", color: "#eff6ff", border: "#3b82f6" },
              { icon: "📈", label: "Trends & Tools", desc: "BMI calculator, workout plan", path: "/fitnessTrends", color: "#f0fdf4", border: "#16a34a" },
              { icon: "🍎", label: "Food Guide", desc: "Search nutrition data", path: "/food", color: "#fff7ed", border: "#ff6b00" },
              { icon: "👤", label: "My Profile", desc: "Update your health info", path: "/profile", color: "#fdf4ff", border: "#9333ea" },
            ].map(({ icon, label, desc, path, color, border }) => (
              <div key={label} style={{ ...s.quickNavCard, background: color, borderLeft: `4px solid ${border}` }}
                onClick={() => navigate(path)}>
                <div style={s.quickNavIcon}>{icon}</div>
                <div>
                  <div style={s.quickNavLabel}>{label}</div>
                  <div style={s.quickNavDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
};

const s = {
  page: { minHeight: "100vh", background: "#f8f9fb", fontFamily: "'Segoe UI', sans-serif" },
  navbar: { background: "#fff", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", position: "sticky", top: 0, zIndex: 100 },
  brand: { fontSize: "20px", fontWeight: "800", color: "#ff6b00" },
  navLinks: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" },
  navBtn: { background: "transparent", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#444", transition: "background 0.2s" },
  navBtnOutline: { background: "#fff7ed", border: "1.5px solid #ff6b00", padding: "7px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#ff6b00" },
  logoutBtn: { background: "#fee2e2", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#dc2626" },
  content: { maxWidth: "1100px", margin: "0 auto", padding: "28px 24px" },
  welcomeBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" },
  welcomeTitle: { fontSize: "24px", fontWeight: "700", color: "#1a1a1a", margin: 0 },
  welcomeSub: { color: "#888", fontSize: "14px", margin: "4px 0 0" },
  syncBadge: { background: "#fff7ed", border: "1.5px solid #ff6b00", color: "#ff6b00", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" },
  connectBanner: { background: "linear-gradient(135deg, #fff7ed, #ffedd5)", border: "1.5px solid #ff6b00", borderRadius: "14px", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", gap: "12px", flexWrap: "wrap" },
  connectBtn: { background: "linear-gradient(135deg, #ff6b00, #ff9a3c)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap" },
  onboarding: { background: "#fff", border: "1.5px solid #ff6b00", borderRadius: "16px", padding: "28px", marginBottom: "28px", boxShadow: "0 2px 12px rgba(255,107,0,0.1)" },
  onboardingTitle: { fontSize: "18px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 6px" },
  onboardingSub: { color: "#888", fontSize: "14px", marginBottom: "24px" },
  steps: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" },
  step: { display: "flex", gap: "14px", alignItems: "flex-start" },
  stepNum: { width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #ff6b00, #ff9a3c)", color: "#fff", fontWeight: "800", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  stepTitle: { fontSize: "14px", fontWeight: "700", color: "#1a1a1a", marginBottom: "4px" },
  stepDesc: { fontSize: "13px", color: "#666", lineHeight: 1.5 },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "28px" },
  statCard: { borderRadius: "16px", padding: "20px 16px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s" },
  cardIcon: { fontSize: "28px", marginBottom: "8px" },
  cardValue: { fontSize: "26px", fontWeight: "800", color: "#1a1a1a" },
  cardLabel: { fontSize: "12px", color: "#888", marginTop: "4px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" },
  section: { background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "24px" },
  sectionTitle: { fontSize: "16px", fontWeight: "700", color: "#1a1a1a", marginTop: 0, marginBottom: "18px" },
  inputGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" },
  inputCard: { display: "flex", flexDirection: "column", gap: "6px" },
  inputLabel: { fontSize: "13px", fontWeight: "600", color: "#555" },
  select: { padding: "10px 12px", borderRadius: "10px", border: "1.5px solid #e0e0e0", fontSize: "14px", background: "#fafafa", cursor: "pointer", outline: "none" },
  actions: { display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" },
  primaryBtn: { padding: "12px 24px", background: "linear-gradient(135deg, #ff6b00, #ff9a3c)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer" },
  secondaryBtn: { padding: "12px 24px", background: "#fff", color: "#ff6b00", border: "1.5px solid #ff6b00", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer" },
  saveMsg: { fontSize: "14px", fontWeight: "600", color: "#16a34a" },
  tipsSection: { marginTop: "32px", background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  tipsSectionTitle: { fontSize: "16px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 16px" },
  tipsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" },
  tipCard: { display: "flex", gap: "10px", alignItems: "flex-start", background: "#f8f9fb", borderRadius: "10px", padding: "12px" },
  tipIcon: { fontSize: "20px", flexShrink: 0 },
  tipText: { fontSize: "13px", color: "#555", lineHeight: 1.5 },
  quickNavSection: { marginTop: "24px" },
  quickNavGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px" },
  quickNavCard: { display: "flex", gap: "14px", alignItems: "center", borderRadius: "12px", padding: "16px", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "transform 0.15s" },
  quickNavIcon: { fontSize: "26px", flexShrink: 0 },
  quickNavLabel: { fontSize: "14px", fontWeight: "700", color: "#1a1a1a" },
  quickNavDesc: { fontSize: "12px", color: "#888", marginTop: "2px" },
};

export default HomeDash;
