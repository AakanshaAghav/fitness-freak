import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SecondPage.css";
import axios from 'axios';

const SecondPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('', { firstName, email, password, confirmPassword })
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

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

  const handleNext = () => {
    if (!firstName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    //✅ Save data to localStorage before navigating
    const basicInfo = {
      firstName,
      email,
      password
    };

    localStorage.setItem("signupData", JSON.stringify(basicInfo));

    // ✅ Navigate to second sign-up page
    navigate("/third");
  };


  return (
    <div className="Second-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <div className="progress-bar"></div>
        <h2>Create Your Account</h2>
        <p>We're happy you're here. Let's get to know a little about you.</p>

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />

        {error && <p className="error">{error}</p>}

        <div className="button-group">
          <button className="back-btn" onClick={() => navigate("/")}>
            BACK
          </button>
          <button className="next-btn" onClick={handleNext}>
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondPage;
