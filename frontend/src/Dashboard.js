import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const startWeight = 70;
  const targetWeight = 60;
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysData = [];
    for (let i = 1; i <= 15; i++) {
      const weightLoss = i * 0.5;
      const weight = startWeight - weightLoss;
      const calories = 500 + (i * 20);
      const status = weightLoss >= i * 0.5 ? "Good" : "Improve";

      daysData.push({ day: i, weight: weight.toFixed(1), calories, status });
    }
    setDays(daysData);
  }, []);

  const totalLost = (startWeight - days[14]?.weight).toFixed(1);
  const progressPercent = ((totalLost / (startWeight - targetWeight)) * 100).toFixed(1);

  const message = totalLost >= (startWeight - targetWeight) 
    ? (
        <>
          <div style={styles.goalMessage}>🎉 Congratulations! You achieved your goal! 🎯</div>
          <div style={styles.motivationalMessage}>Keep up the healthy lifestyle! 💪</div>
        </>
      )
    : <div style={styles.motivationalMessage}>🚀 You're on the right track! Keep pushing! 🧡</div>;

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.header}>15-Day Weight Loss Dashboard</h1>

      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Day</th>
            <th style={styles.th}>Weight (kg)</th>
            <th style={styles.th}>Calories Burned</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {days.map(entry => (
            <tr key={entry.day} style={styles.tr}>
              <td style={styles.td}>{entry.day}</td>
              <td style={styles.td}>{entry.weight}</td>
              <td style={styles.td}>{entry.calories}</td>
              <td style={entry.status === 'Good' ? styles.statusGood : styles.statusImprove}>
                {entry.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.footer}>
        <div>🏁 Total Lost: <strong>{totalLost} kg</strong></div>
        <div>🎯 Goal: <strong>{targetWeight} kg</strong></div>
        <div>📈 Progress: <strong>{progressPercent}%</strong></div>
      </div>

      <div style={styles.progressBarContainer}>
        <div style={{ ...styles.progressBar, width: `${progressPercent}%` }}></div>
      </div>

      <div style={styles.messages}>
        {message}
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff8f0',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(255, 102, 0, 0.2)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
  },
  header: {
    color: '#ff6600',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2.5rem',
    textShadow: '1px 1px 2px #ffd699',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thead: {
    backgroundColor: '#ff8533',
    color: '#fff',
  },
  th: {
    padding: '14px 20px',
    textAlign: 'center',
    borderBottom: '1px solid #ffe0b3',
    transition: 'background-color 0.3s',
  },
  td: {
    padding: '14px 20px',
    textAlign: 'center',
    borderBottom: '1px solid #ffe0b3',
    transition: 'background-color 0.3s',
  },
  tr: {
    transition: 'background-color 0.3s',
  },
  statusGood: {
    color: '#009688',
    fontWeight: 'bold',
    textShadow: '1px 1px 1px #b2dfdb',
  },
  statusImprove: {
    color: '#e53935',
    fontWeight: 'bold',
    textShadow: '1px 1px 1px #ffcdd2',
  },
  footer: {
    padding: '20px',
    backgroundColor: '#fff1cc',
    display: 'flex',
    justifyContent: 'space-around',
    fontWeight: 600,
    color: '#ff6600',
    borderTop: '2px solid #ffd699',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  progressBarContainer: {
    backgroundColor: '#ffe6cc',
    borderRadius: '10px',
    margin: '20px',
    height: '20px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ff6600',
    width: '0%',
    transition: 'width 1s ease-in-out',
  },
  goalMessage: {
    textAlign: 'center',
    fontSize: '1.3rem',
    marginTop: '20px',
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  motivationalMessage: {
    textAlign: 'center',
    fontSize: '1.1rem',
    margin: '10px 0',
    color: '#ff6600',
    fontStyle: 'italic',
  },
  messages: {
    marginTop: '20px',
  },
};

export default Dashboard;
