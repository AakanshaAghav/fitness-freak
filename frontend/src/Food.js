import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const featuredFoods = [
  { name: "Banana", emoji: "🍌", cal: 89, protein: "1.1g", carbs: "23g", fat: "0.3g", benefit: "Energy boost, rich in potassium", tag: "Weight Gain" },
  { name: "Avocado", emoji: "🥑", cal: 160, protein: "2g", carbs: "9g", fat: "15g", benefit: "Healthy fats, reduces hunger", tag: "Weight Loss" },
  { name: "Chicken Breast", emoji: "🍗", cal: 165, protein: "31g", carbs: "0g", fat: "3.6g", benefit: "High protein, muscle building", tag: "Muscle Gain" },
  { name: "Oats", emoji: "🌾", cal: 389, protein: "17g", carbs: "66g", fat: "7g", benefit: "Slow-release energy, high fiber", tag: "Weight Loss" },
  { name: "Eggs", emoji: "🥚", cal: 155, protein: "13g", carbs: "1.1g", fat: "11g", benefit: "Complete protein, vitamins B12 & D", tag: "Muscle Gain" },
  { name: "Salmon", emoji: "🐟", cal: 208, protein: "20g", carbs: "0g", fat: "13g", benefit: "Omega-3 fatty acids, heart health", tag: "Heart Health" },
  { name: "Spinach", emoji: "🥬", cal: 23, protein: "2.9g", carbs: "3.6g", fat: "0.4g", benefit: "Iron, vitamins K & A, low calorie", tag: "Weight Loss" },
  { name: "Greek Yogurt", emoji: "🥛", cal: 59, protein: "10g", carbs: "3.6g", fat: "0.4g", benefit: "Probiotics, gut health, high protein", tag: "Gut Health" },
];

const tagColors = {
  "Weight Gain": "#ff6b00",
  "Weight Loss": "#16a34a",
  "Muscle Gain": "#7c3aed",
  "Heart Health": "#e53935",
  "Gut Health": "#0891b2",
};

const mealPlans = [
  {
    goal: "🔥 Weight Loss",
    color: "#f0fdf4",
    border: "#16a34a",
    meals: [
      { time: "Breakfast", food: "Oats with berries + green tea" },
      { time: "Lunch", food: "Grilled chicken salad with olive oil dressing" },
      { time: "Snack", food: "Greek yogurt + handful of almonds" },
      { time: "Dinner", food: "Steamed salmon with spinach and quinoa" },
    ]
  },
  {
    goal: "💪 Muscle Gain",
    color: "#fdf4ff",
    border: "#7c3aed",
    meals: [
      { time: "Breakfast", food: "4 scrambled eggs + whole wheat toast + banana" },
      { time: "Lunch", food: "Chicken breast + brown rice + broccoli" },
      { time: "Snack", food: "Peanut butter + apple + protein shake" },
      { time: "Dinner", food: "Beef stir-fry with vegetables + sweet potato" },
    ]
  },
  {
    goal: "⚡ Energy Boost",
    color: "#fff7ed",
    border: "#ff6b00",
    meals: [
      { time: "Breakfast", food: "Banana smoothie + oats + honey" },
      { time: "Lunch", food: "Whole grain pasta with tuna and olive oil" },
      { time: "Snack", food: "Dates + mixed nuts + coconut water" },
      { time: "Dinner", food: "Lentil soup + whole grain bread + avocado" },
    ]
  },
];

const Food = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState(null);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setNoResult(false);
    setResults([]);
    setSelected(null);
    try {
      const res = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=12&fields=product_name,brands,nutriments`
      );
      const products = (res.data.products || []).filter(
        p => p.product_name && p.nutriments && (
          p.nutriments['energy-kcal_100g'] || p.nutriments['energy-kcal'] || p.nutriments['energy_100g']
        )
      );
      if (products.length === 0) setNoResult(true);
      setResults(products.slice(0, 6));
    } catch {
      setNoResult(true);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.navbar}>
        <div style={s.brand}>🏋️ Fitness Freak</div>
        <button style={s.backBtn} onClick={() => navigate('/homedash')}>← Dashboard</button>
      </div>

      <div style={s.content}>
        {/* Header */}
        <div style={s.header}>
          <h1 style={s.title}>🍎 Healthy Food Guide</h1>
          <p style={s.sub}>Search any food for real nutrition data, or explore our curated guides</p>
        </div>

        {/* Search */}
        <div style={s.searchBox}>
          <input style={s.searchInput} placeholder="Search any food (e.g. apple, rice, chicken...)"
            value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()} />
          <button style={s.searchBtn} onClick={handleSearch} disabled={searching}>
            {searching ? "Searching..." : "🔍 Search"}
          </button>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Search Results</h2>
            <div style={s.resultGrid}>
              {results.map((p, i) => {
                const n = p.nutriments;
                return (
                  <div key={i} style={s.resultCard} onClick={() => setSelected(selected === i ? null : i)}>
                    <div style={s.resultName}>{p.product_name}</div>
                    <div style={s.resultBrand}>{p.brands || 'Unknown brand'}</div>
                    <div style={s.macroRow}>
                      <span style={{ ...s.macro, background: '#fff7ed', color: '#ff6b00' }}>🔥 {Math.round(n['energy-kcal_100g'] || n['energy-kcal'] || (n['energy_100g'] / 4.184) || 0)} kcal</span>
                      <span style={{ ...s.macro, background: '#f0fdf4', color: '#16a34a' }}>🥩 {Math.round(n.proteins_100g || 0)}g protein</span>
                      <span style={{ ...s.macro, background: '#eff6ff', color: '#3b82f6' }}>🌾 {Math.round(n.carbohydrates_100g || 0)}g carbs</span>
                      <span style={{ ...s.macro, background: '#fdf4ff', color: '#7c3aed' }}>🧈 {Math.round(n.fat_100g || 0)}g fat</span>
                    </div>
                    {selected === i && (
                      <div style={s.extraInfo}>
                        {n.fiber_100g ? <div>🌿 Fiber: {n.fiber_100g}g</div> : null}
                        {n.sugars_100g ? <div>🍬 Sugars: {n.sugars_100g}g</div> : null}
                        {n.sodium_100g ? <div>🧂 Sodium: {n.sodium_100g}g</div> : null}
                        <div style={{ fontSize: '11px', color: '#aaa', marginTop: '8px' }}>Per 100g · Source: Open Food Facts</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {noResult && <div style={s.noResult}>No results found. Try a different search term.</div>}

        {/* Featured Foods */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>⭐ Featured Superfoods</h2>
          <div style={s.foodGrid}>
            {featuredFoods.map(({ name, emoji, cal, protein, carbs, fat, benefit, tag }) => (
              <div key={name} style={s.foodCard}>
                <div style={s.foodEmoji}>{emoji}</div>
                <div style={{ ...s.tag, background: tagColors[tag] + '22', color: tagColors[tag] }}>{tag}</div>
                <div style={s.foodName}>{name}</div>
                <div style={s.foodMacros}>
                  <span>🔥 {cal} kcal</span>
                  <span>🥩 {protein}</span>
                  <span>🌾 {carbs}</span>
                  <span>🧈 {fat}</span>
                </div>
                <div style={s.foodBenefit}>{benefit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Plans */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>📋 Sample Meal Plans by Goal</h2>
          <div style={s.planGrid}>
            {mealPlans.map(({ goal, color, border, meals }) => (
              <div key={goal} style={{ ...s.planCard, background: color, borderTop: `4px solid ${border}` }}>
                <h3 style={{ ...s.planGoal, color: border }}>{goal}</h3>
                {meals.map(({ time, food }) => (
                  <div key={time} style={s.mealRow}>
                    <span style={s.mealTime}>{time}</span>
                    <span style={s.mealFood}>{food}</span>
                  </div>
                ))}
              </div>
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
  header: { textAlign: 'center', marginBottom: '36px' },
  title: { fontSize: '32px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 8px' },
  sub: { fontSize: '15px', color: '#888' },
  searchBox: { display: 'flex', gap: '10px', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' },
  searchInput: { flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e0e0e0', fontSize: '14px', outline: 'none' },
  searchBtn: { padding: '12px 20px', background: 'linear-gradient(135deg, #ff6b00, #ff9a3c)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' },
  section: { marginBottom: '48px' },
  sectionTitle: { fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '20px' },
  resultGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  resultCard: { background: '#fff', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'box-shadow 0.2s' },
  resultName: { fontSize: '15px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' },
  resultBrand: { fontSize: '12px', color: '#aaa', marginBottom: '12px' },
  macroRow: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  macro: { fontSize: '12px', fontWeight: '600', padding: '4px 8px', borderRadius: '6px' },
  extraInfo: { marginTop: '12px', fontSize: '13px', color: '#555', lineHeight: 1.8, borderTop: '1px solid #f0f0f0', paddingTop: '10px' },
  noResult: { textAlign: 'center', color: '#888', padding: '24px', background: '#fff', borderRadius: '12px', marginBottom: '32px' },
  foodGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' },
  foodCard: { background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' },
  foodEmoji: { fontSize: '36px', marginBottom: '8px' },
  tag: { display: 'inline-block', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', marginBottom: '8px' },
  foodName: { fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' },
  foodMacros: { display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', fontSize: '12px', color: '#666', marginBottom: '10px' },
  foodBenefit: { fontSize: '12px', color: '#888', lineHeight: 1.5 },
  planGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  planCard: { borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  planGoal: { fontSize: '17px', fontWeight: '700', margin: '0 0 16px' },
  mealRow: { display: 'flex', gap: '12px', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '13px' },
  mealTime: { fontWeight: '700', color: '#555', minWidth: '70px' },
  mealFood: { color: '#444', lineHeight: 1.4 },
};

export default Food;
