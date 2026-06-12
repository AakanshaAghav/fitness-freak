import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !email || !password || !confirmPassword) { setError("Please fill in all fields."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/auth/signup", { firstName, email, password });
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      toast.error("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.brand}>🏋️ Fitness Freak</div>
        <h2 style={s.heading}>Create your account</h2>
        <p style={s.sub}>Start your fitness journey today — it's free</p>

        <form onSubmit={handleSubmit}>
          {[
            { label: "First Name", type: "text", val: firstName, set: setFirstName, ph: "John" },
            { label: "Email", type: "email", val: email, set: setEmail, ph: "you@example.com" },
            { label: "Password", type: "password", val: password, set: setPassword, ph: "••••••••" },
            { label: "Confirm Password", type: "password", val: confirmPassword, set: setConfirmPassword, ph: "••••••••" },
          ].map(({ label, type, val, set, ph }) => (
            <div key={label} style={s.field}>
              <label style={s.label}>{label}</label>
              <input style={s.input} type={type} placeholder={ph} value={val} onChange={(e) => set(e.target.value)} />
            </div>
          ))}

          {error && <p style={s.error}>{error}</p>}
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p style={s.footer}>
          Already have an account?{" "}
          <span style={s.link} onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

const s = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #ff6b00 0%, #ff9a3c 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  card: { background: "#fff", borderRadius: "20px", padding: "48px 40px", width: "100%", maxWidth: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" },
  brand: { fontSize: "22px", fontWeight: "800", color: "#ff6b00", marginBottom: "28px", textAlign: "center" },
  heading: { fontSize: "26px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 6px" },
  sub: { color: "#888", fontSize: "14px", marginBottom: "28px" },
  field: { marginBottom: "16px" },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" },
  input: { width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid #e0e0e0", fontSize: "14px", outline: "none", boxSizing: "border-box" },
  error: { color: "#e53935", fontSize: "13px", marginBottom: "12px", background: "#fff5f5", padding: "8px 12px", borderRadius: "8px" },
  btn: { width: "100%", padding: "13px", background: "linear-gradient(135deg, #ff6b00, #ff9a3c)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "700", cursor: "pointer", marginTop: "4px" },
  footer: { textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#666" },
  link: { color: "#ff6b00", cursor: "pointer", fontWeight: "600" },
};

export default Signup;
