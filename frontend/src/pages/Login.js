import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    axios.post("http://localhost:5000/auth/login", { email, password })
      .then((result) => {
        console.log(result.data);
        if (result.data.success) {
          localStorage.setItem("token", result.data.jwtToken);
          localStorage.setItem("email", email); // ✅ Save email for future use
          alert("Login successful!");
          navigate("/homedash"); // Navigate to dashboard or homepage
        } else {
          setError(result.data.message || "Login failed.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Invalid email or password.");
      });

  };

  const styles = {
    body: {
      margin: 0,
      fontFamily: '"Segoe UI", sans-serif',
      backgroundColor: "#f2f2f2",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "10px",
      width: "100%",
      maxWidth: "400px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      marginBottom: "20px",
      textAlign: "left",
      fontSize: "24px",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      backgroundColor: "#orange",
      color: "white",
      padding: "12px",
      fontSize: "16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    error: {
      color: "red",
      fontSize: "13px",
      marginBottom: "10px",
    },
    signup: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "14px",
    },
    linkText: {
      color: "#007bff",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.body}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.heading}>Welcome Back! Login to your account</h2>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" style={styles.button}>Login</button>

        <p style={styles.signup}>
          Don't have an account?{" "}
          <span style={styles.linkText} onClick={() => navigate("/signup")}>
            Create one
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
