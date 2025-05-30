import React, { useState } from 'react';

const Food = () => {
  const foodInfoData = {
    'banana': {
      description:
        'Bananas are high in calories and rich in potassium, making them a perfect food for weight gain. They provide energy and help in building muscle mass.',
    },
    'avocado': {
      description:
        'Avocados are rich in healthy fats and fiber, making them perfect for weight loss. They help in controlling appetite and are good for heart health.',
    },
    'peanut butter': {
      description:
        'Peanut butter is a high-calorie food packed with healthy fats and protein. It is ideal for people trying to gain weight by adding extra calories to their diet.',
    },
    'berries': {
      description:
        'Berries, like strawberries, blueberries, and raspberries, are low in calories and packed with antioxidants. They are excellent for weight loss and overall health.',
    },
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    if (foodInfoData[query]) {
      setFoodInfo(foodInfoData[query]);
    } else {
      alert('Food not found.');
    }
  };

  const showFoodInfo = (foodName) => {
    setFoodInfo(foodInfoData[foodName.toLowerCase()]);
  };

  const styles = {
    root: {
      '--primary': '#69c0b4',
      '--accent': '#f7b733',
      '--highlight': '#ff8c42',
      '--background': '#e6f7f4',
      '--card-bg': '#ffffff',
      '--text-color': '#333',
    },
    body: {
      fontFamily: "'Inter', sans-serif",
      backgroundColor: 'var(--background)',
      color: 'var(--text-color)',
      margin: 0,
      padding: '40px',
    },
    header: {
      color: 'var(--highlight)',
      textAlign: 'center',
      fontSize: '2.5rem',
      marginBottom: '40px',
    },
    searchContainer: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    searchInput: {
      padding: '10px',
      width: '50%',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '2px solid var(--primary)',
      outline: 'none',
    },
    searchButton: {
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: 'var(--accent)',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },
    searchButtonHover: {
      backgroundColor: '#f5a623',
    },
    foodInfo: {
      display: foodInfo ? 'block' : 'none',
      marginTop: '30px',
      background: 'var(--card-bg)',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    foodInfoTitle: {
      fontSize: '1.8rem',
      color: 'var(--highlight)',
    },
    foodInfoDescription: {
      fontSize: '1rem',
      color: '#666',
    },
    foodCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '30px',
    },
    foodCard: {
      background: 'var(--card-bg)',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
    },
    foodCardHover: {
      transform: 'translateY(-5px)',
    },
    foodCardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    foodCardTitle: {
      marginTop: '15px',
      color: 'var(--highlight)',
    },
    foodCardDescription: {
      fontSize: '1rem',
      color: '#666',
      marginBottom: '10px',
    },
    foodCardButton: {
      padding: '10px 20px',
      backgroundColor: 'var(--primary)',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    foodCardButtonHover: {
      backgroundColor: '#58a39e',
    },
    googleSearchContainer: {
      textAlign: 'center',
      marginTop: '30px',
    },
  };

  return (
    <div style={styles.body}>
      <h1 style={styles.header}>Healthy Food Guide</h1>

      <div style={styles.searchContainer}>
        <input
          type="text"
          id="searchInput"
          placeholder="Search for a food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button
          onClick={handleSearch}
          style={styles.searchButton}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.searchButtonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.searchButton.backgroundColor)}
        >
          Search
        </button>
      </div>

      {/* Food Info Container */}
      {foodInfo && (
        <div style={styles.foodInfo}>
          <h2 style={styles.foodInfoTitle}>Food Information</h2>
          <p style={styles.foodInfoDescription}>{foodInfo.description}</p>
        </div>
      )}

      <div style={styles.foodCards}>
        {/* Food Card for Weight Gain */}
        <div style={styles.foodCard}>
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.FZ0pu7WcurIoPGU9JX4ErQHaGu&pid=Api&P=0&h=220"
            alt="Banana"
            style={styles.foodCardImage}
          />
          <h3 style={styles.foodCardTitle}>Banana</h3>
          <p style={styles.foodCardDescription}>
            Great source of energy and packed with calories, perfect for weight gain.
          </p>
          <button
            onClick={() => showFoodInfo('Banana')}
            style={styles.foodCardButton}
          >
            Learn More
          </button>
        </div>

        {/* Food Card for Weight Loss */}
        <div style={styles.foodCard}>
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.pfovvApg2H_R1uYImakGYgHaF2&pid=Api&P=0&h=220"
            alt="Avocado"
            style={styles.foodCardImage}
          />
          <h3 style={styles.foodCardTitle}>Avocado</h3>
          <p style={styles.foodCardDescription}>
            Rich in healthy fats, avocado helps in reducing body fat and controlling hunger.
          </p>
          <button
            onClick={() => showFoodInfo('Avocado')}
            style={styles.foodCardButton}
          >
            Learn More
          </button>
        </div>

        {/* Food Card for Weight Gain */}
        <div style={styles.foodCard}>
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.U1OomTGFd5vlr-wlwir8cQHaFj&pid=Api&P=0&h=220"
            alt="Peanut Butter"
            style={styles.foodCardImage}
          />
          <h3 style={styles.foodCardTitle}>Peanut Butter</h3>
          <p style={styles.foodCardDescription}>
            High in healthy fats and protein, ideal for gaining weight.
          </p>
          <button
            onClick={() => showFoodInfo('Peanut Butter')}
            style={styles.foodCardButton}
          >
            Learn More
          </button>
        </div>

        {/* Food Card for Weight Loss */}
        <div style={styles.foodCard}>
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.QAyVwNJrr0-E65OJHtKtEwHaE7&pid=Api&P=0&h=220"
            alt="Berries"
            style={styles.foodCardImage}
          />
          <h3 style={styles.foodCardTitle}>Berries</h3>
          <p style={styles.foodCardDescription}>
            Low in calories and high in antioxidants, great for weight loss.
          </p>
          <button
            onClick={() => showFoodInfo('Berries')}
            style={styles.foodCardButton}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Google Search Box */}
      <div style={styles.googleSearchContainer}>
        <h3>Search for More Information on Google</h3>
        <form action="https://www.google.com/search" method="get" target="_blank">
          <input type="text" name="q" placeholder="Search for foods" required />
          <button type="submit">Google Search</button>
        </form>
      </div>
    </div>
  );
};

export default Food;
