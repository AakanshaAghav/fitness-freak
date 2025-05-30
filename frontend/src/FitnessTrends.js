import React from 'react';

const FitnessTrends = () => {
  const trends = [
    {
      title: "Smart Workouts",
      description: "AI-powered fitness routines that adapt to your progress, providing personalized recommendations.",
      image: "https://tse2.mm.bing.net/th?id=OIP.hzqG0LRFh7K5yTsxAlp6hgHaE8&pid=Api&P=0&h=220",
      colorClass: "blue",
    },
    {
      title: "Wearable Fitness Tech",
      description: "Track your heart rate, sleep, steps, and more with the latest smart devices.",
      image: "https://tse2.mm.bing.net/th?id=OIP.DTXWdFmGQIXxpf750KiyEAHaFj&pid=Api&P=0&h=220",
      colorClass: "green",
    },
    {
      title: "Recovery & Wellness",
      description: "Prioritize recovery techniques like cryotherapy, massage guns, and mindfulness.",
      image: "https://tse3.mm.bing.net/th?id=OIP.ElNYyP5c0gMBhiPR2f4d0QHaEc&pid=Api&P=0&h=220",
      colorClass: "purple",
    },
    {
      title: "Virtual Fitness Classes",
      description: "Join online fitness classes at your convenience with trainers and communities worldwide.",
      image: "https://tse1.mm.bing.net/th?id=OIP.4V1ezo5Bc2GsrjnYJ-bP0AHaE8&pid=Api&P=0&h=220",
      colorClass: "blue",
    },
    {
      title: "Mind-Body Fitness",
      description: "Integrate mindfulness and physical fitness through practices like yoga and Pilates.",
      image: "https://tse3.mm.bing.net/th?id=OIP.18fNhHJRhStnb-SYvaQBpwHaFa&pid=Api&P=0&h=220",
      colorClass: "green",
    },
    {
      title: "Plant-Based Diets",
      description: "Healthy eating with plant-based meals that promote fitness and overall wellness.",
      image: "https://tse3.mm.bing.net/th?id=OIP.Rt7PdWt-PfCdtFBSOxh1DQHaE8&pid=Api&P=0&h=220",
      colorClass: "purpimagle",
    },
  ];

  const styles = {
    container: {
      fontFamily: 'Inter, sans-serif',
      padding: '40px',
      backgroundColor: '#e6f7f4', // light blue-green
      color: '#333',
      margin: 0,
    },
    header: {
      color: '#ff8c42', // soft orange
      textAlign: 'center',
      fontSize: '3rem',
      marginBottom: '40px',
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    },
    trendContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '30px',
    },
    trendCard: {
      background: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(105, 192, 180, 0.1)', // soft green shadow
      textAlign: 'center',
      transition: 'transform 0.3s ease',
    },
    trendCardHover: {
      transform: 'translateY(-5px)',
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    trendTitle: {
      marginTop: '20px',
      fontSize: '1.5rem',
      color: '#ff8c42', // soft orange
    },
    description: {
      fontSize: '1rem',
      color: '#666',
      margin: '10px 0',
    },
    btnLearnMore: {
      backgroundColor: '#f7b733', // yellow
      color: '#fff',
      padding: '10px 20px',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },
    btnHover: {
      backgroundColor: '#f5a623', // hover soft orange
    },
  };

  const getBorderColor = (colorClass) => {
    switch (colorClass) {
      case 'blue':
        return '#69c0b4'; // blue-green
      case 'green':
        return '#1abc9c'; // green
      case 'purple':
        return '#9b59b6'; // purple
      default:
        return '#69c0b4'; // blue-green
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🌿 Fitness Trends of 2025</h1>

      <div style={styles.trendContainer}>
        {trends.map((trend, index) => (
          <div
            key={index}
            style={{
              ...styles.trendCard,
              borderLeft: `8px solid ${getBorderColor(trend.colorClass)}`,
              transition: 'transform 0.3s ease',
            }}
          >
            <img src={trend.image} alt={trend.title} style={styles.image} />
            <h2 style={styles.trendTitle}>{trend.title}</h2>
            <p style={styles.description}>{trend.description}</p>
            <button
              style={styles.btnLearnMore}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.btnHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#f7b733')}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessTrends;
