import React, { useState } from "react";
import "./Caloricounter.css";

const Caloricounter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputText, setInputText] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePredict = () => {
    alert("Predicting calories based on input...");
  };

  return (
    <div className="calori-container">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="logo">Fitness Frek</div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Food Calories AI</a></li>
            <li><a href="#">Calories Calculators</a></li>
            <li><a href="#">Calories</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>AI Calorie Calculator: Chat with Calculator</h1>
        <p>Snap food photos or chat with AI to predict your calorie intake instantly!</p>

        <div className="input-section">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your food, or upload a picture..."
            className="text-area"
          ></textarea>
          <div className="button-group">
            <label htmlFor="file-upload" className="upload-button">
              📷 Upload Image
            </label>
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <button className="predict-button" onClick={handlePredict}>Predict</button>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="action-buttons">
        <button className="action-button">Take a picture to identify calories</button>
        <button className="action-button">Create a weight loss plan</button>
        <button className="action-button">Calories Calculators</button>
      </section>

      {/* Calorie Plan Section */}
      <section className="calorie-plan">
        <h2>Calorie Plans for a Healthier You!</h2>
        <p>Get a personalized plan tailored to your goals with AI recommendations.</p>
        <button className="plan-button">Get your plan!</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 CalCounter. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Caloricounter;
