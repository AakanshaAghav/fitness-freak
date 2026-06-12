import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { icon: "🥗", title: "Dial up your diet", desc: "Track 84+ vitamins and minerals to eat a more balanced diet every day.", color: "#fff7ed" },
  { icon: "🏃", title: "Reach your goal weight", desc: "Monitor food intake with detailed journaling and a built-in nutritional target wizard.", color: "#f0fdf4" },
  { icon: "📊", title: "Holistic health view", desc: "Sync with your devices and track biometrics from blood sugar to gut health.", color: "#eff6ff" },
  { icon: "🔒", title: "Trustworthy companion", desc: "Accurate nutrition data within a secure framework to keep your data safe.", color: "#fdf4ff" },
];

const stats = [];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.navbar}>
        <div style={s.logo}>🏋️ Fitness-Freak</div>
        <div style={s.navRight}>
          <span style={s.navLink} onClick={() => navigate("/features")}>Features</span>
          <button style={s.loginBtn} onClick={() => navigate("/login")}>Login</button>
          <button style={s.signupBtn} onClick={() => navigate("/signup")}>Sign Up Free</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={s.hero}>
        <motion.div style={s.heroText} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={s.badge}>🚀 Science-backed fitness tracking</div>
          <h1 style={s.heroTitle}>
            Your health journey,<br />
            <span style={s.heroAccent}>supercharged.</span>
          </h1>
          <p style={s.heroDesc}>
            From macros to micros, Fitness-Freak gives you personalized insight into your diet, exercise, and health data — so you can make smarter decisions every day.
          </p>
          <div style={s.heroBtns}>
            <button style={s.ctaBtn} onClick={() => navigate("/signup")}>Get Started Free</button>
            <button style={s.ghostBtn} onClick={() => navigate("/features")}>See Features →</button>
          </div>
        </motion.div>

        <motion.div style={s.heroVisual} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <div style={s.mockCard}>
            <div style={s.mockHeader}>📊 Today's Summary</div>
            {[
              { label: "Steps", val: "8,420", icon: "🚶", color: "#ff6b00" },
              { label: "Calories", val: "1,840 kcal", icon: "🔥", color: "#e53935" },
              { label: "Heart Rate", val: "72 bpm", icon: "❤️", color: "#7c3aed" },
              { label: "SpO₂", val: "98%", icon: "🩸", color: "#16a34a" },
            ].map(({ label, val, icon, color }) => (
              <div key={label} style={s.mockRow}>
                <span>{icon} {label}</span>
                <span style={{ color, fontWeight: 700 }}>{val}</span>
              </div>
            ))}
            <div style={{ ...s.mockRow, marginTop: "12px", borderTop: "1px solid #f0f0f0", paddingTop: "12px" }}>
              <span style={{ fontSize: "12px", color: "#aaa" }}>🔄 Live from Google Fit</span>
              <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: 600 }}>● Connected</span>
            </div>
          </div>
        </motion.div>
      </div>



      {/* Features */}
      <div style={s.featuresSection}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Everything you need to stay on track</h2>
          <p style={s.sectionSub}>Powerful tools built for real people with real goals</p>
        </div>
        <div style={s.featureGrid}>
          {features.map(({ icon, title, desc, color }, i) => (
            <motion.div key={title} style={{ ...s.featureCard, background: color }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}>
              <div style={s.featureIcon}>{icon}</div>
              <h3 style={s.featureTitle}>{title}</h3>
              <p style={s.featureDesc}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={s.ctaBanner}>
        <h2 style={s.ctaBannerTitle}>Ready to take control of your health?</h2>
        <p style={s.ctaBannerSub}>Join millions of people already tracking their fitness with Fitness-Freak.</p>
        <button style={s.ctaBannerBtn} onClick={() => navigate("/signup")}>Start for Free →</button>
      </div>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerTop}>
          <div style={s.footerBrand}>🏋️ Fitness-Freak</div>
          <p style={s.footerDisclaimer}>
            Content is for educational purposes only and not medical advice. Consult your physician before starting any fitness program.
          </p>
        </div>
        <div style={s.footerLinks}>
          {["About", "Features", "Meal Plans", "Blog", "Support", "Privacy"].map(l => (
            <span key={l} style={s.footerLink}>{l}</span>
          ))}
        </div>
        <div style={s.footerBottom}>© 2026 Fitness-Freak. All rights reserved.</div>
      </footer>
    </div>
  );
}

const s = {
  page: { fontFamily: "'Segoe UI', sans-serif", background: "#fff", color: "#1a1a1a" },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 60px", background: "#fff", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" },
  logo: { fontSize: "20px", fontWeight: "800", color: "#ff6b00" },
  navRight: { display: "flex", alignItems: "center", gap: "20px" },
  navLink: { fontSize: "14px", fontWeight: "600", color: "#555", cursor: "pointer" },
  loginBtn: { background: "transparent", border: "1.5px solid #e0e0e0", padding: "8px 18px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", color: "#333" },
  signupBtn: { background: "linear-gradient(135deg, #ff6b00, #ff9a3c)", border: "none", padding: "9px 20px", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer", color: "#fff" },
  hero: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "80px 60px", background: "linear-gradient(135deg, #1c1c2e 0%, #2d1b4e 100%)", gap: "40px", flexWrap: "wrap" },
  heroText: { flex: 1, minWidth: "300px" },
  badge: { display: "inline-block", background: "rgba(255,107,0,0.2)", color: "#ff9a3c", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", marginBottom: "20px" },
  heroTitle: { fontSize: "48px", fontWeight: "800", color: "#fff", lineHeight: 1.2, margin: "0 0 16px" },
  heroAccent: { color: "#ff6b00" },
  heroDesc: { fontSize: "17px", color: "#aaa", lineHeight: 1.7, maxWidth: "480px", marginBottom: "32px" },
  heroBtns: { display: "flex", gap: "14px", flexWrap: "wrap" },
  ctaBtn: { background: "linear-gradient(135deg, #ff6b00, #ff9a3c)", color: "#fff", border: "none", padding: "14px 28px", borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: "pointer" },
  ghostBtn: { background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", padding: "13px 24px", borderRadius: "10px", fontWeight: "600", fontSize: "15px", cursor: "pointer" },
  heroVisual: { flex: 1, minWidth: "280px", display: "flex", justifyContent: "center" },
  mockCard: { background: "#fff", borderRadius: "20px", padding: "24px", width: "280px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" },
  mockHeader: { fontSize: "15px", fontWeight: "700", color: "#1a1a1a", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #f0f0f0" },
  mockRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", fontSize: "14px", color: "#555" },
  statsBar: { display: "flex", justifyContent: "space-around", padding: "40px 60px", background: "#fff7ed", flexWrap: "wrap", gap: "20px" },
  statItem: { textAlign: "center" },
  statValue: { fontSize: "32px", fontWeight: "800", color: "#ff6b00" },
  statLabel: { fontSize: "13px", color: "#888", fontWeight: "600", marginTop: "4px" },
  featuresSection: { padding: "80px 60px", background: "#fff" },
  sectionHeader: { textAlign: "center", marginBottom: "48px" },
  sectionTitle: { fontSize: "32px", fontWeight: "800", color: "#1a1a1a", margin: "0 0 10px" },
  sectionSub: { fontSize: "16px", color: "#888" },
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px" },
  featureCard: { borderRadius: "16px", padding: "28px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s" },
  featureIcon: { fontSize: "32px", marginBottom: "14px" },
  featureTitle: { fontSize: "17px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 8px" },
  featureDesc: { fontSize: "14px", color: "#666", lineHeight: 1.6, margin: 0 },
  ctaBanner: { background: "linear-gradient(135deg, #ff6b00, #ff9a3c)", padding: "80px 60px", textAlign: "center" },
  ctaBannerTitle: { fontSize: "34px", fontWeight: "800", color: "#fff", margin: "0 0 12px" },
  ctaBannerSub: { fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "32px" },
  ctaBannerBtn: { background: "#fff", color: "#ff6b00", border: "none", padding: "14px 32px", borderRadius: "10px", fontWeight: "700", fontSize: "16px", cursor: "pointer" },
  footer: { background: "#1c1c2e", color: "#aaa", padding: "48px 60px 24px" },
  footerTop: { display: "flex", gap: "40px", marginBottom: "32px", flexWrap: "wrap", alignItems: "flex-start" },
  footerBrand: { fontSize: "20px", fontWeight: "800", color: "#ff6b00", whiteSpace: "nowrap" },
  footerDisclaimer: { fontSize: "13px", lineHeight: 1.6, maxWidth: "600px", margin: 0 },
  footerLinks: { display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "24px" },
  footerLink: { fontSize: "13px", cursor: "pointer", color: "#888" },
  footerBottom: { fontSize: "12px", color: "#555", borderTop: "1px solid #333", paddingTop: "20px" },
};
