import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const slides1 = [
  { id: 1, image: "https://cdn1.cronometer.com/wf-2025-03-20/images/home-card-1.png-converted.webp", text: "Develop healthy habits" },
  { id: 2, image: "https://cdn1.cronometer.com/wf-2025-03-20/images/home-card-5.png-converted.webp", text: "Track macros" },
  { id: 3, image: "https://cdn1.cronometer.com/wf-2025-03-20/images/home-card-2.png-converted.webp", text: "Analyze nutrition" },
  { id: 4, image: "https://cdn1.cronometer.com/wf-2025-03-20/images/home-card-3.png-converted.webp", text: "Monitor Calories" },
  { id: 5, image: "https://cdn1.cronometer.com/wf-2025-03-20/images/home-card-4.png-converted.webp", text: "Stay Active" }
];

const slides2 = [...slides1];

export default function Home() {
  const navigate = useNavigate(); // <-- FIXED: Added useNavigate

  return (
    <div className="containe1">
      <div className="container">
        <nav className="navbar">
          <div className="logo">Fitness-Freak</div>
          <div className="menu">
            <a href="#">Products</a>
            <a href="#">Features</a>
            <a href="#">Learn</a>
            <a href="#">Log In</a>
            <button className="signup-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </nav>

        <div className="main-content">
          <div className="text-section">
            <h1>Science-backed nutrition tracking at your fingertips</h1>
            <p style={{marginLeft:"-0px"}}>
              From macros to micros, Fitness-Freak gives you personalized insight into your diet, exercise, and health
              data so you can make more informed decisions about your health.
            </p>
            <button className="cta-btn" style={{width:"200px"}} onClick={() => navigate("/signup")}>
              Sign Up - It's Free!
            </button>
          </div>

          <div className="slider-wrapper">
            <div className="slider-container">
              <motion.div
                className="slider"
                animate={{ y: ["0%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
              >
                {[...slides1, ...slides1].map((slide, index) => (
                  <div key={index} className="slide" style={{ marginBottom: "20px" }}>
                    <img src={slide.image} alt={slide.text} />
                    <p>{slide.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="slider-container">
              <motion.div
                className="slider"
                animate={{ y: ["-100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
              >
                {[...slides2, ...slides2].map((slide, index) => (
                  <div key={index} className="slide" style={{ marginBottom: "20px" }}>
                    <img src={slide.image} alt={slide.text} />
                    <p>{slide.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="container2">
        <div className="question-section">
          <h2>Ready to take control of your health?</h2>
          <p>Here’s how Fitness-Freak can help!</p>
        </div>

        <div className="features-section">
          <div className="box1">
            <div className="box1-content">
              <h2 style={{fontSize:"30px"}}>Dial up your diet</h2>
              <p style={{color:"black", marginLeft:"-10px"}}>See which of the essential 84 vitamins and minerals you’re getting the most and least of, helping you eat a more balanced diet.</p>
            </div>
            <div className="imges"><img src="https://cdn1.cronometer.com/wf-2025-03-20/images/salad-bars-1.webp" /></div>
          </div>

          <div className="box2" style={{ backgroundColor: "#1CCAD7" }} onClick={() => navigate("/workout")}>
            <div className="box2-content">
              <h2 style={{fontSize:"30px"}}>Reach & maintain your goal weight</h2>
              <p style={{color:"black", marginLeft:"-10px"}}>Monitor your food intake with detailed food journaling, verified nutrition information, and a built-in nutritional target wizard to keep yourself accountable.</p>
            </div>
            <div className="imges"><img src="https://cdn1.cronometer.com/wf-2025-03-20/images/home-block-2.png-converted.webp" /></div>
          </div>
        </div>

        <div className="features-section1">
          <div className="box3" style={{ backgroundColor: "#44D07B" }}>
            <div className="box3-content">
              <h2 style={{fontSize:"30px"}}>Get a holistic view of your health</h2>
              <p style={{color:"black", marginLeft:"-10px"}}>Sync Fitness-Freak with all your devices and track all your biometrics from pain symptoms to gut health to blood sugar levels and more.</p>
            </div>
            <div className="imges"><img src="https://cdn1.cronometer.com/wf-2025-03-20/images/home-block-3.png-converted.webp" /></div>
          </div>

          <div className="box4" style={{ backgroundColor: "#FFAD00" }}>
            <div className="box4-content">
              <h2 style={{fontSize:"30px"}}>Gain a trustworthy companion</h2>
              <p style={{color:"black", marginLeft:"-10px"}}>We're proud to offer accurate nutrition information within a lock-tight framework to keep your data safe.</p>
            </div>
            <div className="imges"><img src="https://cdn1.cronometer.com/wf-2025-03-20/images/home-gain.svg" /></div>
          </div>
         </div>
       </div>
       <footer className="footer">
  <div className="back-to-top">Back to top</div>
  <div className="footer-container">
    <div className="footer-section">
      <h3>The Fitness Freak Diet</h3>
      <p>
        The material on this website is provided for <strong>educational purposes only</strong> and is not to be used for medical advice, diagnosis, or treatment.
      </p>
      <p><strong>Important:</strong> Before starting any fitness or diet program, consult your physician or health care provider.</p>
      <p><em>*Individual fitness and weight loss results may vary.</em></p>
      <button className="join-btn">Join Now</button>
    </div>
    <div className="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li>About the Fitness Freak Diet</li>
        <li>Meal Plans</li>
        <li>Success Stories</li>
        <li>Pricing</li>
        <li>Membership Plans</li>
        <li>For Business</li>
        <li>Login</li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Resources</h3>
      <ul>
        <li>Get My Free Fitness Score</li>
        <li>Personalized Workout Plan</li>
        <li>Diet Assessment</li>
        <li>Calorie Calculator</li>
        <li>Blog</li>
        <li>Workout Collections</li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Contact Us</h3>
      <p>Visit our Help Center if you have any questions or contact us to get in touch.</p>
      <button className="help-btn">Help Center</button>
      <h3>Our Apps</h3>
      <div className="app-links">
        <img src="appstore.png" alt="App Store" />
        <img src="googleplay.png" alt="Google Play" />
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}
