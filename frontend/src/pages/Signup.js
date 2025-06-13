import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.backgroundColor = "#FCF0E0";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.height = "100vh";
    document.body.style.margin = "0";

    return () => {
      document.body.style = "";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        firstName,
        email,
        password,
      });

      toast.success("Account created successfully!");
      console.log(response.data); // backend response
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Try again.");
    }
  };

  const styles = {
    container: {
      textAlign: "center",
    },
    formBox: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      width: "400px",
      textAlign: "center",
      position: "relative",
    },
    progressBar: {
      height: "5px",
      width: "100px",
      backgroundColor: "#0066ff",
      position: "absolute",
      top: 0,
      left: "20px",
    },
    heading: {
      fontSize: "20px",
      marginBottom: "10px",
    },
    subtext: {
      fontSize: "14px",
      color: "gray",
      marginLeft: "80px",
    },
    label: {
      display: "block",
      textAlign: "left",
      fontWeight: "bold",
      margin: "10px 0 5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    createBtn: {
      backgroundColor: "#orange",
      color: "white",
      border: "none",
      padding: "10px 24px",
      borderRadius: "4px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    loginLink: {
      textAlign: "center",
      marginTop: "15px",
      fontSize: "0.9em",
      color: "#333",
    },
    linkText: {
      color: "#007bff",
      cursor: "pointer",
      textDecoration: "underline",
    },
    error: {
      color: "red",
      fontSize: "14px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.formBox} onSubmit={handleSubmit}>
        <div style={styles.progressBar}></div>
        <h2 style={styles.heading}>Create Your Account</h2>
        <p style={styles.subtext}>
          We're happy you're here. Let's get to know a little about you.
        </p>

        <label htmlFor="firstName" style={styles.label}>First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          style={styles.input}
        />

        <label htmlFor="email" style={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={styles.input}
        />

        <label htmlFor="password" style={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={styles.input}
        />

        <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <div>
          <button type="submit" style={styles.createBtn}>
            CREATE ACCOUNT
          </button>
          <p style={styles.loginLink}>
            Already have an account?{" "}
            <span style={styles.linkText} onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
