import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError("");
    setLoading(true);
    axios.post("http://localhost:5000/auth/login", { email, password })
      .then((result) => {
        if (result.data.success) {
          localStorage.setItem("token", result.data.jwtToken);
          localStorage.setItem("email", email);
          navigate("/homedash");
        } else {
          setError(result.data.message || "Login failed.");
        }
      })
      .catch(() => setError("Invalid email or password."))
      .finally(() => setLoading(false));
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.brand}>🏋️ Fitness Freak</div>
        <h2 style={s.heading}>Welcome back</h2>
        <p style={s.sub}>Sign in to continue your fitness journey</p>

        <form onSubmit={handleLogin}>
          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input style={s.input} type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p style={s.error}>{error}</p>}
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={s.footer}>
          Don't have an account?{" "}
          <span style={s.link} onClick={() => navigate("/signup")}>Create one</span>
        </p>
      </div>
    </div>
  );
};

const s = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #ff6b00 0%, #ff9a3c 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  card: { background: "#fff", borderRadius: "20px", padding: "48px 40px", width: "100%", maxWidth: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" },
  brand: { fontSize: "22px", fontWeight: "800", color: "#ff6b00", marginBottom: "28px", textAlign: "center" },
  heading: { fontSize: "26px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 6px" },
  sub: { color: "#888", fontSize: "14px", marginBottom: "28px" },
  field: { marginBottom: "18px" },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" },
  input: { width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid #e0e0e0", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border 0.2s" },
  error: { color: "#e53935", fontSize: "13px", marginBottom: "12px", background: "#fff5f5", padding: "8px 12px", borderRadius: "8px" },
  btn: { width: "100%", padding: "13px", background: "linear-gradient(135deg, #ff6b00, #ff9a3c)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "700", cursor: "pointer", marginTop: "4px" },
  footer: { textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#666" },
  link: { color: "#ff6b00", cursor: "pointer", fontWeight: "600" },
};

export default LoginPage;
