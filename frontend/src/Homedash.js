import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome, FaBook, FaChartLine, FaAppleAlt, FaEllipsisH, FaClipboardList, FaLifeRing, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function HomeDash() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFoodPopup, setShowFoodPopup] = useState(false);
  const [showExercisePopup, setShowExercisePopup] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [customFood, setCustomFood] = useState("");
  const [customExercise, setCustomExercise] = useState("");
  const [showBiometricPopup, setShowBiometricPopup] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState("");
  const [showAccountPopup, setShowAccountPopup] = useState(false);

  const [steps, setSteps] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [calories, setCalories] = useState(null); // New state for calories
  const [weight, setWeight] = useState(null);
  const [spo2, setSpo2] = useState(null);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');

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

  const userProfile = {
    name: "John Doe",
    email: "johndoe@example.com",
    membership: "Premium Member",
  };

  const foodOptions = ["Apple", "Banana", "Chicken Salad", "Oatmeal", "Rice", "Eggs", "Grilled Fish"];
  const exerciseOptions = ["Running", "Cycling", "Push-ups", "Squats", "Jump Rope", "Deadlifts", "Yoga"];

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

  const handleFoodSelect = (food) => {
    if (!selectedFoods.includes(food)) {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  // Handle adding a custom food
  const handleCustomFoodAdd = () => {
    if (customFood.trim() !== "" && !selectedFoods.includes(customFood)) {
      setSelectedFoods([...selectedFoods, customFood]);
      setCustomFood(""); // Clear input after adding
    }
  };

  // Handle exercise selection
  const handleExerciseSelect = (exercise) => {
    if (!selectedExercises.includes(exercise)) {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  // Handle custom exercise addition
  const handleCustomExerciseAdd = () => {
    if (customExercise.trim() !== "" && !selectedExercises.includes(customExercise)) {
      setSelectedExercises([...selectedExercises, customExercise]);
      setCustomExercise(""); // Clear input
    }
  };

  // Function to mock biometric scanning
  const handleBiometricScan = () => {
    const success = Math.random() > 0.5; // Simulates success/failure (50% chance)
    if (success) {
      setBiometricStatus("✅ Authentication Successful!");
    } else {
      setBiometricStatus("❌ Authentication Failed. Try Again.");
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
          <div style={styles.account} onClick={() => setShowAccountPopup(true)}>Account ▼</div>
        </div>

        {/* Quick Add Section */}
        <div style={styles.quickAdd}>
          <span style={styles.quickAddText}>Quick Add to Diary</span>
          <div style={styles.quickButtons}>
            <button style={styles.quickButton} onClick={() => navigate("/food")}>🍎 FOOD</button>
            <button style={styles.quickButton} onClick={() => setShowExercisePopup(true)}>🏋️ EXERCISE</button>
            <button style={styles.quickButton} onClick={() => setShowBiometricPopup(true)}>💜 BIOMETRIC</button>
            <button style={styles.quickButton}>📄 NOTE</button>
            <button style={styles.quickButton} onClick={() => navigate("/talkai")}>🤖 Talk To AI</button>
            <button style={styles.quickButton} onClick={() => navigate("/caloricounter")}>🥗 AI Calorie Counter</button>
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
          {/* Weight Goal Overview Card */}
          {/* <div style={styles.card}>
            <h3>Weight Goal Overview</h3>
            <p>Maintain Weight - <strong>40 kg</strong></p>
            <button style={styles.logWeightButton}>LOG WEIGHT</button>
          </div> */}

          {/* Eat Smarter, Sleep Better Card */}
          <div style={styles.cardBlue}>
            <h3>Eat Smarter. Sleep Better.</h3>
            <p>Discover how your nutrition is affecting your sleep by connecting a device.</p>
            <button style={styles.getStartedButton}>GET STARTED</button>
          </div>
        </div>


        {/* Display Selected Foods */}
        {selectedFoods.length > 0 && (
          <div style={styles.selectedContainer}>
            <h4>Selected Foods:</h4>
            <ul>
              {selectedFoods.map((food, index) => (
                <li key={index} style={styles.selectedItem}>{food}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Display Selected Exercises */}
        {selectedExercises.length > 0 && (
          <div style={styles.selectedContainer}>
            <h4>Selected Exercises:</h4>
            <ul>
              {selectedExercises.map((exercise, index) => (
                <li key={index} style={styles.selectedItem}>{exercise}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Food Selection Popup */}
        {showFoodPopup && (
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <h3>Select Your Food</h3>
              <div style={styles.optionList}>
                {foodOptions.map((food, index) => (
                  <button key={index} style={styles.optionButton} onClick={() => handleFoodSelect(food)}>
                    {food}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={customFood}
                onChange={(e) => setCustomFood(e.target.value)}
                placeholder="Enter custom food..."
                style={styles.input}
              />
              <button style={styles.addButton} onClick={handleCustomFoodAdd}>Add</button>
              <button style={styles.closeButton} onClick={() => setShowFoodPopup(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Exercise Selection Popup */}
        {showExercisePopup && (
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <h3>Select Your Exercise</h3>
              <div style={styles.optionList}>
                {exerciseOptions.map((exercise, index) => (
                  <button key={index} style={styles.optionButton} onClick={() => handleExerciseSelect(exercise)}>
                    {exercise}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={customExercise}
                onChange={(e) => setCustomExercise(e.target.value)}
                placeholder="Enter custom exercise..."
                style={styles.input}
              />
              <button style={styles.addButton} onClick={handleCustomExerciseAdd}>Add</button>
              <button style={styles.closeButton} onClick={() => setShowExercisePopup(false)}>Close</button>
            </div>
          </div>
        )}
        {/* Biometric Popup */}
        {showBiometricPopup && (
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <h3>Scan Your Biometric</h3>
              <p>Place your finger on the scanner or use face recognition.</p>
              <button style={styles.scanButton} onClick={handleBiometricScan}>🔍 Scan Biometric</button>
              {biometricStatus && <p>{biometricStatus}</p>}
              <button style={styles.closeButton} onClick={() => setShowBiometricPopup(false)}>Close</button>
            </div>
          </div>
        )}
        {/* Account Popup */}
        {showAccountPopup && (
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <h3>User Profile</h3>
              <p><strong>Name:</strong> {userProfile.name}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Membership:</strong> {userProfile.membership}</p>
              <button style={styles.closeButton} onClick={() => setShowAccountPopup(false)}>Close</button>
            </div>
          </div>
        )}

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
  fastButton: {
    backgroundColor: "#046c63",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  logWeightButton: {
    backgroundColor: "#046c63",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  getStartedButton: {
    backgroundColor: "#02699c",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  /* Selected Items */
  selectedContainer: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  selectedContainerTitle: {
    marginBottom: "10px",
  },
  selectedItem: {
    padding: "5px 0",
    fontSize: "16px",
  },
  /* Popups */
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    width: "350px",
    textAlign: "center",
    zIndex: 1000,
  },
  popupContentTitle: {
    marginBottom: "15px",
  },
  optionList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  optionButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "14px",
    transition: "background 0.3s",
  },
  optionButtonHover: {
    backgroundColor: "#0056b3",
  },
  input: {
    width: "80%",
    padding: "8px",
    marginTop: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  popupContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  scanButton: {
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  scanButtonHover: {
    backgroundColor: "#0056b3",
  },
  addButton: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  closeButton: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },


};


export default HomeDash;
