import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [steps, setSteps] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [calories, setCalories] = useState(null);
  const [weight, setWeight] = useState(null);
  const [spo2, setSpo2] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  // The core function to fetch fitness data from Google Fit API
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
      setStatusMessage("Data fetched successfully.");

      // Steps extraction
      const stepsPoints = res.data.bucket[0]?.dataset[0]?.point || [];
      const totalSteps = stepsPoints.reduce((sum, point) => sum + (point.value?.[0]?.intVal || 0), 0);
      setSteps(totalSteps);

      // Heart rate extraction
      const hrPoints = res.data.bucket[0]?.dataset[1]?.point || [];
      const totalHr = hrPoints.reduce((sum, point) => sum + (point.value?.[0]?.fpVal || 0), 0);
      const avgHeartRate = hrPoints.length > 0 ? (totalHr / hrPoints.length).toFixed(1) : 0;
      setHeartRate(avgHeartRate);

      // Calories extraction
      const calPoints = res.data.bucket[0]?.dataset[2]?.point || [];
      const totalCalories = calPoints.reduce((sum, point) => sum + (point.value?.[0]?.fpVal || 0), 0);
      setCalories(totalCalories.toFixed(2));

      // Weight
      const weightPoints = res.data.bucket[0]?.dataset[3]?.point || [];
      const latestWeight = weightPoints.length > 0
        ? weightPoints[weightPoints.length - 1].value[0].fpVal.toFixed(1)
        : 0;
      setWeight(latestWeight);

      // SpO2 extraction
      const spo2Points = res.data.bucket[0]?.dataset[4]?.point || [];
      const totalSpo2 = spo2Points.reduce((sum, point) => sum + (point.value?.[0]?.fpVal || 0), 0);
      const avgSpo2 = spo2Points.length > 0 ? (totalSpo2 / spo2Points.length).toFixed(1) : 0;
      setSpo2(avgSpo2);

    } catch (error) {
      if (error.response?.status === 401) {
        console.log("Access token expired. Attempting to refresh.");
        const refreshToken = localStorage.getItem('refresh_token');

        if (refreshToken) {
          try {
            const refreshRes = await axios.post('http://localhost:5000/auth/refresh-token', { refreshToken });
            const newAccessToken = refreshRes.data.access_token;
            localStorage.setItem('fitness_token', newAccessToken); // Store new token
            setStatusMessage("Token refreshed successfully. Retrying request...");
            // Retry the original data fetch with the new token
            await fetchFitnessData(newAccessToken);
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError.response?.data || refreshError.message);
            localStorage.removeItem('fitness_token');
            localStorage.removeItem('refresh_token');
            setStatusMessage("Session expired. Please log in again.");
          }
        } else {
          console.error("No refresh token found. User must re-authenticate.");
          setStatusMessage("No session found. Please log in.");
        }
      } else {
        console.error("Error fetching fitness data:", error.response?.data || error.message);
        setStatusMessage("Failed to fetch data. Please try again.");
      }
      
      setSteps(0);
      setHeartRate(0);
      setCalories(0);
      setWeight(0);
      setSpo2(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToBackend = async () => {
    if (!email) {
      setStatusMessage("User email is missing. Cannot save data.");
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
        spo2
      });
      setStatusMessage("✅ Fitness data saved successfully!");
    } catch (error) {
      console.error("Failed to save fitness data:", error);
      setStatusMessage("❌ Failed to save data. Try again.");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const refreshToken = urlParams.get('refresh_token');
    const userEmail = localStorage.getItem('email'); // Make sure this is set at login

    if (userEmail) setEmail(userEmail);

    if (token && refreshToken) {
      // If we got a token from the URL, save it and clean the URL
      localStorage.setItem('fitness_token', token);
      localStorage.setItem('refresh_token', refreshToken);
      window.history.replaceState({}, document.title, "/dashboard");
      fetchFitnessData(token);
    } else {
      // Otherwise, try to get it from local storage
      const storedToken = localStorage.getItem('fitness_token');
      if (storedToken) {
        fetchFitnessData(storedToken);
      } else {
        setLoading(false);
        setStatusMessage("No access token found. Please log in to connect your Google Fit account.");
        console.log("No access token found.");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Your Health Dashboard</h1>
        <p className="text-center text-gray-600 mb-6">Hello, {email || 'Guest'}! Here is your latest fitness data from your connected smartwatch.</p>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="text-xl font-semibold text-gray-700">Loading fitness data...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 shadow-sm flex flex-col items-center">
                <div className="text-4xl text-blue-500 mb-2">🏃‍♂️</div>
                <p className="text-lg font-medium text-gray-500">Steps</p>
                <p className="text-3xl font-bold text-blue-800">{steps !== null ? steps : "N/A"}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-6 shadow-sm flex flex-col items-center">
                <div className="text-4xl text-red-500 mb-2">❤️</div>
                <p className="text-lg font-medium text-gray-500">Heart Rate (Avg)</p>
                <p className="text-3xl font-bold text-red-800">{heartRate !== null ? heartRate + " bpm" : "N/A"}</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-6 shadow-sm flex flex-col items-center">
                <div className="text-4xl text-yellow-500 mb-2">🔥</div>
                <p className="text-lg font-medium text-gray-500">Calories Burned</p>
                <p className="text-3xl font-bold text-yellow-800">{calories !== null ? calories + " kcal" : "N/A"}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 shadow-sm flex flex-col items-center">
                <div className="text-4xl text-green-500 mb-2">⚖️</div>
                <p className="text-lg font-medium text-gray-500">Latest Weight</p>
                <p className="text-3xl font-bold text-green-800">{weight !== null ? weight + " kg" : "N/A"}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 shadow-sm flex flex-col items-center">
                <div className="text-4xl text-purple-500 mb-2">🩸</div>
                <p className="text-lg font-medium text-gray-500">SpO₂ (Avg)</p>
                <p className="text-3xl font-bold text-purple-800">{spo2 !== null ? spo2 + " %" : "N/A"}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSaveToBackend}
                className="px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200"
              >
                Save Today's Data
              </button>
            </div>
          </>
        )}
        <div className="text-center mt-4 text-sm text-gray-500">{statusMessage}</div>
      </div>
    </div>
  );
}

export default Dashboard;
