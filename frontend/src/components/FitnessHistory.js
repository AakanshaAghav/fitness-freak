import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const FitnessHistory = ({ email }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const userEmail = email || localStorage.getItem("email");

  useEffect(() => {
    if (!userEmail) {
      setFetchError("No email found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/fitness/get-fitness-history/${userEmail}`);
        if (Array.isArray(res.data)) {
          setHistory(res.data);
        } else if (Array.isArray(res.data.history)) {
          setHistory(res.data.history);
        } else {
          setFetchError("No fitness history found.");
        }
      } catch (err) {
        setFetchError("Failed to fetch fitness history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userEmail]);

  if (loading) return <p>Loading data...</p>;
  if (fetchError) return <p style={{ color: "red" }}>{fetchError}</p>;
  if (!history.length) return <p>No data found.</p>;

  const labels = history.map(item => item.date);
  const steps = history.map(item => item.steps);
  const calories = history.map(item => item.calories);
  const heartRate = history.map(item => item.heartRate);
  const weight = history.map(item => item.weight);

  // 🆕 Map categorical to numeric
  const mapSugar = { normal: 1, prediabetic: 2, diabetic: 3 };
  const mapBP = { normal: 1, prehypertension: 2, hypertension: 3 };
  const mapCholesterol = { normal: 1, 'borderline high': 2, high: 3 };
  const mapActivity = { sedentary: 1, 'lightly active': 2, 'moderately active': 3, 'very active': 4 };

  const sugar = history.map(item => mapSugar[item.sugarStatus.toLowerCase()] || 0);
  const bp = history.map(item => mapBP[item.bpStatus.toLowerCase()] || 0);
  const cholesterol = history.map(item => mapCholesterol[item.cholesterol.toLowerCase()] || 0);
  const activity = history.map(item => mapActivity[item.activityLevel.toLowerCase()] || 0);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    },
    scales: {
      y: {
        ticks: {
          callback: function (value, index, values) {
            return value; // You can customize this to show category labels
          }
        }
      }
    }
  };

  const makeLineChart = (label, data, color) => ({
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + '33',
        fill: true,
        tension: 0.3,
      },
    ],
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px' }}>
      <h2 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        📊 Weekly Fitness Summary
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{ height: '260px', padding: '10px', backgroundColor: '#eff6ff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Line data={makeLineChart("Steps", steps, "#3b82f6")} options={chartOptions} />
        </div>
        <div style={{ height: '260px', padding: '10px', backgroundColor: '#ecfdf5', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Line data={makeLineChart("Calories", calories, "#10b981")} options={chartOptions} />
        </div>
        <div style={{ height: '260px', padding: '10px', backgroundColor: '#fee2e2', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Line data={makeLineChart("Heart Rate", heartRate, "#ef4444")} options={chartOptions} />
        </div>
        <div style={{ height: '260px', padding: '10px', backgroundColor: '#ede9fe', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Line data={makeLineChart("Weight (kg)", weight, "#8b5cf6")} options={chartOptions} />
        </div>

        {/* 🆕 Categorical Charts */}
        <div style={{ height: '260px', padding: '10px', backgroundColor: '#fef9c3', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Line data={makeLineChart("Sugar Level", sugar, "#facc15")} options={chartOptions} />
        </div>
        <div style={{ height: '260px', padding: '10px', backgroundColor: '#fce7f3', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Line data={makeLineChart("BP Status", bp, "#db2777")} options={chartOptions} />
        </div>
        <div style={{ height: '260px', padding: '10px', backgroundColor: '#e0f2fe', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Line data={makeLineChart("Cholesterol", cholesterol, "#0ea5e9")} options={chartOptions} />
        </div>
        <div style={{ height: '260px', padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Line data={makeLineChart("Activity Level", activity, "#22c55e")} options={chartOptions} />
        </div>
      </div>

      <h3 style={{ textAlign: 'center', fontSize: '24px', color: '#555', marginBottom: '20px' }}>
        📅 Day-wise Details
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        justifyItems: 'center'
      }}>
        {history.map((entry, idx) => {
          const prev = history[idx - 1];
          return (
            <div
              key={entry.date}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                padding: '20px',
                width: '100%',
                maxWidth: '350px'
              }}
            >
              <h4 style={{ fontWeight: 'bold', fontSize: '18px', color: '#4f46e5', marginBottom: '10px' }}>{entry.date}</h4>
              <ul style={{ fontSize: '14px', color: '#333', listStyle: 'none', padding: 0 }}>
                <li>🚶‍♀️ <strong>Steps:</strong> {entry.steps} {prev ? `(${entry.steps - prev.steps >= 0 ? '+' : ''}${entry.steps - prev.steps})` : ''}</li>
                <li>🔥 <strong>Calories:</strong> {entry.calories} {prev ? `(Prev: ${prev.calories})` : ''}</li>
                <li>❤️ <strong>Heart Rate:</strong> {entry.heartRate} bpm</li>
                <li>⚖️ <strong>Weight:</strong> {entry.weight} kg</li>
                <li>🛌 <strong>Sleep:</strong> {entry.sleepQuality}</li>
                <li>🩸 <strong>Sugar:</strong> {entry.sugarStatus}</li>
                <li>💉 <strong>BP:</strong> {entry.bpStatus}</li>
                <li>🧪 <strong>Cholesterol:</strong> {entry.cholesterol}</li>
                <li>🏃‍♂️ <strong>Activity:</strong> {entry.activityLevel}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FitnessHistory;
