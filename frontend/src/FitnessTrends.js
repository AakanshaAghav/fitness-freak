import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const workouts = [
  { day: "Mon", name: "Full Body Strength", duration: "45 min", exercises: ["3×10 Squats", "3×10 Push-ups", "3×10 Dumbbell Rows", "3×15 Lunges"], color: "#fff7ed", border: "#ff6b00" },
  { day: "Tue", name: "Cardio & Core", duration: "30 min", exercises: ["20 min Brisk Walk/Jog", "3×20 Crunches", "3×30s Plank", "3×15 Leg Raises"], color: "#f0fdf4", border: "#16a34a" },
  { day: "Wed", name: "Active Recovery", duration: "20 min", exercises: ["10 min Stretching", "5 min Deep Breathing", "Light Yoga Flow"], color: "#eff6ff", border: "#3b82f6" },
  { day: "Thu", name: "Upper Body", duration: "40 min", exercises: ["3×12 Shoulder Press", "3×10 Bicep Curls", "3×10 Tricep Dips", "3×12 Chest Fly"], color: "#fdf4ff", border: "#9333ea" },
  { day: "Fri", name: "HIIT Cardio", duration: "25 min", exercises: ["30s Jumping Jacks × 4", "30s Burpees × 4", "30s High Knees × 4", "30s Mountain Climbers × 4"], color: "#fef9c3", border: "#ca8a04" },
  { day: "Sat", name: "Lower Body", duration: "40 min", exercises: ["4×12 Deadlifts", "3×15 Glute Bridges", "3×12 Calf Raises", "3×10 Step-ups"], color: "#ecfdf5", border: "#10b981" },
  { day: "Sun", name: "Rest Day", duration: "—", exercises: ["Hydrate well", "Light walk if desired", "Meal prep for the week"], color: "#f8f9fb", border: "#94a3b8" },
];

const healthTips = [
  { icon: "💧", title: "Hydration Rule", tip: "Drink 35ml of water per kg of body weight daily. For 70kg = 2.45L minimum." },
  { icon: "😴", title: "Sleep & Recovery", tip: "7-9 hours of sleep boosts muscle recovery by 40% and reduces injury risk significantly." },
  { icon: "🥗", title: "Pre-Workout Meal", tip: "Eat complex carbs + protein 1-2 hours before exercise. Try oats with banana or rice with chicken." },
  { icon: "🏃", title: "10,000 Steps", tip: "Walking 10,000 steps burns ~400-500 kcal and reduces cardiovascular disease risk by 30%." },
  { icon: "🧘", title: "Stress & Cortisol", tip: "High stress raises cortisol which promotes fat storage. 10 min of daily meditation can lower it by 20%." },
  { icon: "⏰", title: "Meal Timing", tip: "Eating within a 8-10 hour window (intermittent fasting) can improve metabolism and fat burning." },
];

const FitnessTrends = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [water, setWater] = useState('');
  const [waterGoal, setWaterGoal] = useState(null);
  const [glasses, setGlasses] = useState(0);
  const [activeDay, setActiveDay] = useState(null);

  const calcBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w && h) setBmi((w / (h * h)).toFixed(1));
  };

  const calcWater = () => {
    const w = parseFloat(water);
    if (w) setWaterGoal((w * 35 / 1000).toFixed(1));
  };

  const getBmiCategory = (b) => {
    if (b < 18.5) return { label: "Underweight", color: "#3b82f6" };
    if (b < 25) return { label: "Normal", color: "#16a34a" };
    if (b < 30) return { label: "Overweight", color: "#f59e0b" };
    return { label: "Obese", color: "#e53935" };
  };

  const bmiCat = bmi ? getBmiCategory(parseFloat(bmi)) : null;
  const glassesGoal = waterGoal ? Math.ceil((parseFloat(waterGoal) * 1000) / 250) : 8;

  return (
    <div style={s.page}>
      <div style={s.navbar}>
        <div style={s.brand}>🏋️ Fitness Freak</div>
        <button style={s.backBtn} onClick={() => navigate('/homedash')}>← Dashboard</button>
      </div>

      <div style={s.content}>
        <div style={s.header}>
          <h1 style={s.title}>💪 Fitness Tools & Weekly Plan</h1>
          <p style={s.sub}>Everything you need to stay consistent and healthy</p>
        </div>

        {/* Calculators row */}
        <div style={s.calcRow}>
          {/* BMI Calculator */}
          <div style={s.calcCard}>
            <h3 style={s.calcTitle}>⚖️ BMI Calculator</h3>
            <div style={s.calcInputs}>
              <div style={s.inputWrap}>
                <label style={s.label}>Weight (kg)</label>
                <input style={s.input} type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
              <div style={s.inputWrap}>
                <label style={s.label}>Height (cm)</label>
                <input style={s.input} type="number" placeholder="175" value={height} onChange={e => setHeight(e.target.value)} />
              </div>
            </div>
            <button style={s.calcBtn} onClick={calcBmi}>Calculate BMI</button>
            {bmi && (
              <div style={s.bmiResult}>
                <div style={{ ...s.bmiValue, color: bmiCat.color }}>{bmi}</div>
                <div style={{ ...s.bmiLabel, color: bmiCat.color }}>{bmiCat.label}</div>
                <div style={s.bmiScale}>
                  {[{ r: "< 18.5", l: "Underweight", c: "#3b82f6" }, { r: "18.5–24.9", l: "Normal", c: "#16a34a" }, { r: "25–29.9", l: "Overweight", c: "#f59e0b" }, { r: "≥ 30", l: "Obese", c: "#e53935" }].map(({ r, l, c }) => (
                    <div key={l} style={s.bmiRow}><span style={{ color: c, fontWeight: 700 }}>{r}</span><span style={{ color: '#888' }}>{l}</span></div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Water Tracker */}
          <div style={s.calcCard}>
            <h3 style={s.calcTitle}>💧 Daily Water Tracker</h3>
            <div style={s.calcInputs}>
              <div style={s.inputWrap}>
                <label style={s.label}>Your Weight (kg)</label>
                <input style={s.input} type="number" placeholder="70" value={water} onChange={e => setWater(e.target.value)} />
              </div>
            </div>
            <button style={s.calcBtn} onClick={calcWater}>Calculate Goal</button>
            {waterGoal && (
              <div style={s.waterResult}>
                <div style={s.waterGoal}>🎯 Goal: <strong>{waterGoal}L</strong> ({glassesGoal} glasses)</div>
                <div style={s.glassesRow}>
                  {Array.from({ length: glassesGoal }).map((_, i) => (
                    <span key={i} style={{ ...s.glass, opacity: i < glasses ? 1 : 0.25 }}
                      onClick={() => setGlasses(i < glasses ? i : i + 1)}>💧</span>
                  ))}
                </div>
                <div style={s.waterProgress}>{glasses}/{glassesGoal} glasses · {((glasses * 250) / 1000).toFixed(2)}L consumed</div>
                {glasses >= glassesGoal && <div style={s.waterDone}>✅ Daily goal reached!</div>}
              </div>
            )}
          </div>
        </div>

        {/* Weekly Workout Plan */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>📅 7-Day Workout Plan</h2>
          <p style={s.sectionSub}>Click any day to see the full workout</p>
          <div style={s.weekGrid}>
            {workouts.map(({ day, name, duration, exercises, color, border }) => (
              <motion.div key={day}
                style={{ ...s.dayCard, background: color, borderTop: `4px solid ${border}`, cursor: 'pointer' }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveDay(activeDay === day ? null : day)}
              >
                <div style={{ ...s.dayLabel, color: border }}>{day}</div>
                <div style={s.dayName}>{name}</div>
                <div style={s.dayDuration}>⏱ {duration}</div>
                {activeDay === day && (
                  <ul style={s.exerciseList}>
                    {exercises.map(e => <li key={e} style={s.exerciseItem}>• {e}</li>)}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Health Tips */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>🧠 Science-Backed Health Tips</h2>
          <div style={s.tipsGrid}>
            {healthTips.map(({ icon, title, tip }, i) => (
              <motion.div key={title} style={s.tipCard}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }} viewport={{ once: true }}>
                <div style={s.tipIcon}>{icon}</div>
                <div style={s.tipTitle}>{title}</div>
                <div style={s.tipText}>{tip}</div>
              </motion.div>
            ))}
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
  content: { maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '32px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 8px' },
  sub: { fontSize: '15px', color: '#888' },
  calcRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' },
  calcCard: { background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  calcTitle: { fontSize: '17px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 18px' },
  calcInputs: { display: 'flex', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' },
  inputWrap: { flex: 1, minWidth: '100px' },
  label: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '5px' },
  input: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e0e0e0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
  calcBtn: { padding: '10px 20px', background: 'linear-gradient(135deg, #ff6b00, #ff9a3c)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '13px' },
  bmiResult: { marginTop: '16px', textAlign: 'center' },
  bmiValue: { fontSize: '40px', fontWeight: '800' },
  bmiLabel: { fontSize: '16px', fontWeight: '700', marginBottom: '12px' },
  bmiScale: { display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left', fontSize: '12px' },
  bmiRow: { display: 'flex', justifyContent: 'space-between' },
  waterResult: { marginTop: '16px' },
  waterGoal: { fontSize: '14px', color: '#555', marginBottom: '12px' },
  glassesRow: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' },
  glass: { fontSize: '22px', cursor: 'pointer', transition: 'opacity 0.2s' },
  waterProgress: { fontSize: '13px', color: '#888' },
  waterDone: { marginTop: '8px', color: '#16a34a', fontWeight: '700', fontSize: '14px' },
  section: { marginBottom: '48px' },
  sectionTitle: { fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '6px' },
  sectionSub: { fontSize: '13px', color: '#aaa', marginBottom: '18px' },
  weekGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '14px' },
  dayCard: { borderRadius: '14px', padding: '18px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s' },
  dayLabel: { fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' },
  dayName: { fontSize: '14px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' },
  dayDuration: { fontSize: '12px', color: '#888', marginBottom: '8px' },
  exerciseList: { listStyle: 'none', padding: 0, margin: '8px 0 0', borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '8px' },
  exerciseItem: { fontSize: '12px', color: '#555', padding: '3px 0' },
  tipsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  tipCard: { background: '#fff', borderRadius: '14px', padding: '22px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  tipIcon: { fontSize: '28px', marginBottom: '10px' },
  tipTitle: { fontSize: '15px', fontWeight: '700', color: '#1a1a1a', marginBottom: '6px' },
  tipText: { fontSize: '13px', color: '#666', lineHeight: 1.6 },
};

export default FitnessTrends;
