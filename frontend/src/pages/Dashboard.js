import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
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
      window.history.replaceState({}, document.title, "/dashboard");
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

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Fitness Freak Dashboard</h1>
      <p>Steps Today: {steps !== null ? steps : "Loading..."}</p>
      <p>Average Heart Rate Today: {heartRate !== null ? heartRate + " bpm" : "Loading..."}</p>
      <p>Calories Burned Today: {calories !== null ? calories + " kcal" : "Loading..."}</p>
      <p>Latest Weight: {weight !== null ? weight + " kg" : "Loading..."}</p>
      <p>Average SpO₂ Today: {spo2 !== null ? spo2 + " %" : "Loading..."}</p>

    </div>
  );
}

export default Dashboard;
