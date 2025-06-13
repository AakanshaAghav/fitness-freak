// src/DietPlan.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DietPlan = () => {
  const { email } = useParams();
  const [dietPlan, setDietPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/fitness/generate-diet-plan/${email}`);
        setDietPlan(res.data.dietPlan || []);
      } catch (error) {
        console.error("❌ Failed to fetch diet plan:", error.message);
        setDietPlan(["Error fetching diet plan. Please try again later."]);
      } finally {
        setLoading(false);
      }
    };

    fetchDietPlan();
  }, [email]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h2>🍽 Personalized Diet Plan</h2>
      <p style={{ marginBottom: '20px' }}>Based on your past 7 days of fitness data:</p>
      {loading ? (
        <p>Loading diet plan...</p>
      ) : dietPlan.length === 0 ? (
        <p style={{ color: 'gray' }}>No recommendations available for this user.</p>
      ) : (
        <ul style={{ lineHeight: "1.8em" }}>
          {dietPlan.map((tip, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                background: "#f0f8ff",
                padding: "10px",
                borderRadius: "6px"
              }}
            >
              {tip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DietPlan;
