import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ThirdPage.css";

const ThirdPage = () => {
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");

  const handleSubmit = async () => {
    // if (
    //   !age || !gender || !height || !weight || !activity || !goal
    // ) {
    //   alert("Please fill all required fields.");
    //   return;
    // }

    const basicData = JSON.parse(localStorage.getItem("signupData"));

    if (!basicData) {
      alert("Basic signup data not found. Please go back and fill first step.");
      return;
    }

    const fullUserData = {
      ...basicData,
      age,
      gender,
      height,
      weight,
      activityLevel: activity,
      fitnessGoal: goal,
      phoneNumber: phone,
      additionalEmail: email,
      allergies,
      medicalConditions: medicalCondition
    };

    try {
      // const res = await fetch("http://localhost:5000/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(fullUserData)
      // });

      // const data = await res.json();
      // console.log("Server response:", data);

      // // Optionally clear localStorage
      // localStorage.removeItem("signupData");

      // Navigate to dashboard or success page
      navigate("/homedash");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="Profile-container">
      <div className="form-box">
        <h2>Personal Information</h2>
        <p>
          What do you want? Want to lose weight? Don't worry, we are with you. Let's make this journey together!
        </p>

        <label htmlFor="age">Age *</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          min="1"
        />

        <label htmlFor="gender">Gender *</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="height">Height (cm) *</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter your height in cm"
          min="1"
        />

        <label htmlFor="weight">Weight (kg) *</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter your weight in kg"
          min="1"
        />

        <label htmlFor="activity">Activity Level *</label>
        <select
          id="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          <option value="">Select activity level</option>
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="light">Lightly active (light exercise 1-3 days/week)</option>
          <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
          <option value="active">Active (hard exercise 6-7 days/week)</option>
          <option value="very-active">Very active (very hard exercise, physical job)</option>
        </select>

        <label htmlFor="goal">Fitness Goal *</label>
        <select
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="">Select your goal</option>
          <option value="lose-weight">Lose Weight</option>
          <option value="gain-muscle">Gain Muscle</option>
          <option value="maintain-weight">Maintain Weight</option>
          <option value="improve-fitness">Improve Fitness</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="email">Email (optional)</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label htmlFor="phone">Phone Number (optional)</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />

        <label htmlFor="allergies">Any Allergies? (optional)</label>
        <input
          type="text"
          id="allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="List any allergies"
        />

        <label htmlFor="medicalCondition">Medical Conditions? (optional)</label>
        <input
          type="text"
          id="medicalCondition"
          value={medicalCondition}
          onChange={(e) => setMedicalCondition(e.target.value)}
          placeholder="Specify any medical conditions"
        />

        <div className="button-group">
          <button className="back-btn" onClick={() => navigate("/second")}>BACK</button>
          <button className="next-btn" onClick={handleSubmit}>NEXT</button>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
