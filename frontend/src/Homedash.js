import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome, FaBook, FaChartLine, FaAppleAlt, FaEllipsisH, FaClipboardList, FaLifeRing, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function HomeDash() {

  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [steps, setSteps] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [calories, setCalories] = useState(null); // New state for calories
  const [weight, setWeight] = useState(null);
  const [spo2, setSpo2] = useState(null);
  const [email, setEmail] = useState('');

  const [sleepQuality, setSleepQuality] = useState('');
  const [sugarStatus, setSugarStatus] = useState('');
  const [bpStatus, setBpStatus] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');

    const userEmail = localStorage.getItem('email'); // Make sure this is set at login
    //const userEmail = urlParams.get('email');
    if (userEmail) setEmail(userEmail);

    if (token) {
      localStorage.setItem('fitness_token', token);
      window.history.replaceState({}, document.title, "/homedash");
    } else {
      token = localStorage.getItem('fitness_token');
    }

    if (token) {
      fetchFitnessData(token);
    } else {
      console.log("No access token found.");
      setSteps(0);
      setHeartRate(0);
      setCalories(0);
      setWeight(0);
      setSpo2(0);
    }
  }, []);

  const fetchFitnessData = async (accessToken) => {
    const now = new Date();
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); // Start of today
    const endTime = now.getTime(); // Now

    const data = {
      aggregateBy: [
        { dataTypeName: "com.google.step_count.delta" },
        { dataTypeName: "com.google.heart_rate.bpm" },
        { dataTypeName: "com.google.calories.expended" },
        { dataTypeName: "com.google.weight" },
        { dataTypeName: "com.google.oxygen_saturation" }
      ],
      bucketByTime: { durationMillis: endTime - startTime },
      startTimeMillis: startTime,
      endTimeMillis: endTime
    };

    try {
      const res = await axios.post(
        'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Raw Google Fit Response:", res.data);

      // Steps extraction
      const stepsPoints = res.data.bucket[0]?.dataset[0]?.point || [];
      const totalSteps = stepsPoints.reduce((sum, point) => {
        return sum + (point.value?.[0]?.intVal || 0);
      }, 0);
      setSteps(totalSteps);

      // Heart rate extraction
      const hrPoints = res.data.bucket[0]?.dataset[1]?.point || [];
      const totalHr = hrPoints.reduce((sum, point) => {
        return sum + (point.value?.[0]?.fpVal || 0);
      }, 0);
      const avgHeartRate = hrPoints.length > 0 ? (totalHr / hrPoints.length).toFixed(1) : 0;
      setHeartRate(avgHeartRate);

      // Calories extraction
      const calPoints = res.data.bucket[0]?.dataset[2]?.point || [];
      const totalCalories = calPoints.reduce((sum, point) => {
        return sum + (point.value?.[0]?.fpVal || 0);
      }, 0);
      setCalories(totalCalories.toFixed(2));

      // Weight
      const weightPoints = res.data.bucket[0]?.dataset[3]?.point || [];
      const latestWeight = weightPoints.length > 0
        ? weightPoints[weightPoints.length - 1].value[0].fpVal.toFixed(1)
        : 0;
      setWeight(latestWeight);

      // SpO2 extraction
      const spo2Points = res.data.bucket[0]?.dataset[4]?.point || [];
      const totalSpo2 = spo2Points.reduce((sum, point) => {
        return sum + (point.value?.[0]?.fpVal || 0);
      }, 0);
      const avgSpo2 = spo2Points.length > 0 ? (totalSpo2 / spo2Points.length).toFixed(1) : 0;
      setSpo2(avgSpo2);

    } catch (error) {
      console.error("Error fetching fitness data:", error);
      setSteps(0);
      setHeartRate(0);
      setCalories(0);
      setWeight(0);
      setSpo2(0);
    }
  };

  // Sidebar items with corresponding icons
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Diary", icon: <FaBook />, path: "/weightLossDiary" },
    { name: "Trends", icon: <FaChartLine />, path: "/fitnessTrends" },
    { name: "Foods", icon: <FaAppleAlt />, path: "/food" },
    { name: "More", icon: <FaEllipsisH /> },
    { name: "Plans", icon: <FaClipboardList />, path: "/plan" },
    { name: "Support", icon: <FaLifeRing />, path: "/support" },
    { name: "About", icon: <FaInfoCircle />, path: "/about" },
  ];

    const handleSaveToBackend = async () => {
  if (!email) {
    alert("User email is missing in the URL.");
    return;
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    await axios.post('http://localhost:5000/api/fitness/save-fitness-data', {
      email,
      date: today,
      steps,
      heartRate,
      calories,
      weight,
      spo2,
      sleepQuality,
      sugarStatus,
      bpStatus,
      cholesterol,
      activityLevel
    });

    alert("✅ Fitness data saved successfully!");
  } catch (error) {
    console.error("❌ Failed to save fitness data:", error);
    alert("❌ Failed to save data. Try again.");
  }
};

  return (
    <div style={styles.app}>
      {/* Sidebar with animation */}
      <div
        style={{
          ...styles.sidebar,
          width: isExpanded ? "250px" : "80px",
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <h2 style={{ ...styles.logo, opacity: isExpanded ? 1 : 0 }}>Fitness Freak</h2>

        <ul style={styles.menu}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              style={styles.menuItem}
              onClick={() => navigate(item.path)} // Navigate to the path
            >
              <span style={styles.icon}>{item.icon}</span>
              <span style={{ opacity: isExpanded ? 1 : 0, transition: "opacity 0.3s" }}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Dashboard */}
      <div style={styles.dashboard}>
        {/* Header */}
        <div style={styles.header}>
          <h2>Your Dashboard</h2>
          <div style={styles.account} onClick={() => navigate('/profile')}>Account ▼</div>
        </div>

        {/* Quick Add Section */}
        <div style={styles.quickAdd}>
          <div style={styles.quickButtons}>
            <button style={styles.quickButton} onClick={() => navigate("/food")}>🍎 FOOD</button>
            <button style={styles.quickButton} onClick={() => navigate("/fitnessTrends")}>🏋️ Trends</button>
             <button
      onClick={() => window.open("http://localhost:3001", "_blank")}
      style={{
        backgroundColor: "#FCF0E0",
    color: "black",
    width: "150px",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
      }}
    >
      🤖 Talk to Chatbot
    </button>
            <button style={styles.quickButton} onClick={() => navigate("/fitness-history")}>📊 Fitness History</button>
          </div>
        </div>

        {/* Cards Section */}
        <div style={styles.cards}>
          {/* Heart Rate Card */}
          <div style={styles.card}>
            <h3 style={{ marginTop: "-10px", fontSize: "18px", color: "#333" }}>Heart Rate ❤️</h3>
            <p style={{ width: "150px", margin: "0" }}>Average Heart Rate Today: {heartRate !== null ? heartRate + " bpm" : "Loading..."}</p>
            {/* You can add more relevant details here */}
          </div>

          {/* Streaks Card */}
          <div style={styles.card}>
            <h3 style={{ marginTop: "-10px", fontSize: "18px", color: "#333" }}>Your Steps 🚶‍➡️</h3>
            <p style={{ width: "150px", margin: "0" }}>Steps Today: {steps !== null ? steps : "Loading..."}</p>
          </div>

          <div style={styles.card}>
            <h3 style={{ marginTop: "-10px", fontSize: "18px", color: "#333" }}>Average SpO2 Today</h3>
            <p style={{ width: "150px", margin: "0" }}>{spo2 !== null ? spo2 + " %" : "Loading..."}</p>
          </div>

          {/* Energy History Card */}
          <div style={styles.card}>
            <h3 style={{ marginTop: "-10px", fontSize: "18px", color: "#333" }}>Energy History (kcal) 💪</h3>
            <p style={{ width: "150px", margin: "0" }}>Calories Burned Today: {calories !== null ? calories + " kcal" : "Loading..."}</p>
          </div>

          {/* Weight Change Card */}
          <div style={styles.card}>
            <h3 style={{ marginTop: "-10px", fontSize: "18px", color: "#333" }}>Your Weight 🏋🏻‍♀️</h3>
            <p style={{ width: "150px", margin: "0" }}>Latest Weight: {weight !== null ? weight + " kg" : "Loading..."}</p>
          </div>
        </div>

        <div style={styles.cards}>
           {/* Sleep Quality */}
          <div style={styles.card}>
            <h3 style={{ marginTop: "-10px", fontSize: "18px", color: "#333" }}>Sleep Quality 😴</h3>
            <select
              value={sleepQuality}
              onChange={(e) => setSleepQuality(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '150px' }}
            >
              <option value="">Select</option>
              <option>Good</option>
              <option>Average</option>
              <option>Poor</option>
            </select>
          </div>


              
            {/* Sugar Status */}
          <div style={styles.card}>
              <h3 style={{ marginTop: "-10px", fontSize: "18px", color: "#333" }}>Sugar Status 🍬</h3>
              <select
                value={sugarStatus}
                onChange={(e) => setSugarStatus(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '150px' }}
              >
                <option value="">Select</option>
                <option>Normal</option>
                <option>Prediabetic</option>
                <option>Diabetic</option>
              </select>
         </div>

                
        {/* Blood Pressure */}
         <div style={styles.card}>
            <h3 style={{ marginTop: "-10px", fontSize: "18px", color: "#333" }}>Blood Pressure 💓</h3>
            <select
              value={bpStatus}
              onChange={(e) => setBpStatus(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '150px' }}
            >
             <option value="">Select</option>
             <option>Normal</option>
             <option>Prehypertension</option>
             <option>Hypertension</option>
            </select>
         </div>

        {/* Cholesterol */}
         <div style={styles.card}>
           <h3 style={{ marginTop: "-10px", fontSize: "18px", color: "#333" }}>Cholesterol 🧈</h3>
           <select
             value={cholesterol}
             onChange={(e) => setCholesterol(e.target.value)}
             style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '150px' }}
            >
            <option value="">Select</option>
            <option>Normal</option>
            <option>Borderline High</option>
            <option>High</option>
           </select>
         </div>

              
            {/* Activity Level */}
         <div style={styles.card}>
             <h3 style={{ marginTop: "-10px", fontSize: "18px", color: "#333" }}>Activity Level 🏃‍♂️</h3>
             <select
               value={activityLevel}
               onChange={(e) => setActivityLevel(e.target.value)}
               style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '150px' }}
             >
               <option value="">Select</option>
               <option>Sedentary</option>
               <option>Lightly Active</option>
               <option>Moderately Active</option>
               <option>Very Active</option>
             </select>
        </div>
       </div>
       {/* Save Button */}
        <button 
            onClick={handleSaveToBackend} 
            style={{
                     padding: "10px 20px",
                     backgroundColor: "orange",
                     color: "Black",
                     border: "none",
                     borderRadius: "6px",
                     marginTop: "20px",
                     cursor: "pointer"
                  }}>
            Save Today's Data
        </button>
        <button
           onClick={() => navigate(`/diet-plan/${email}`)}
           style={{
                    padding: "10px 20px",
                    backgroundColor: "orange",
                    color: "Black",
                    border: "none",
                    borderRadius: "6px",
                    marginTop: "20px",
                    marginLeft: "20px",
                    cursor: "pointer"
                 }}
        >
          Generate Diet Plan
         </button>
      </div>
    </div>
  );
}

// Inline Styles (CSS in JS)
const styles = {
  app: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    height: "100vh",
    backgroundColor: "#1d1d2b",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    transition: "width 0.3s ease-in-out",
    overflow: "hidden",
  },
  logo: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#ff6600",
    transition: "opacity 0.3s",
  },
  menu: {
    listStyleType: "none",
    padding: "0",
    marginTop: "20px",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  icon: {
    fontSize: "18px",
  },
  dashboard: {
    flex: 1,
    backgroundColor: "#f9f7f3",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  account: {
    backgroundColor: "#1d1d2b",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  quickAdd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  quickAddText: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  quickButtons: {
    display: "flex",
    gap: "15px",
  },
  quickButton: {
    backgroundColor: "#FCF0E0",
    color: "black",
    width: "150px",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    flex: 1,
    height: "100px",
  },
  cardBlue: {
    background: "#C2E8F3",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    flex: 1,
  },
  logWeightButton: {
    backgroundColor: "#046c63",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};


export default HomeDash;
