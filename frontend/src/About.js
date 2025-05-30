import React from 'react';

const About = () => {
  const styles = {
    root: {
      '--primary': '#ff9f00', /* Orange */
      '--secondary': '#6fcf97', /* Light Green */
      '--highlight': '#4a90e2', /* Blue */
      '--background': '#f8f9fb', /* Faint White Skin */
      '--card-bg': '#ffffff',
      '--text-color': '#333',
      '--heading-bg': '#ffffff',
      '--heading-color': '#333',
      '--button-bg': '#ff9f00',
      '--button-hover-bg': '#f79c42',
      '--link-color': '#4a90e2',
      '--box-bg': '#f0f9ff', /* Light Blue Background for Boxes */
      '--box-border': '#b0d8ff', /* Border color for boxes */
      '--effect-color': '#333',
    },
    body: {
      fontFamily: "'Inter', sans-serif",
      backgroundColor: 'var(--background)',
      color: 'var(--text-color)',
      margin: 0,
      padding: '40px',
    },
    h1: {
      color: 'var(--heading-color)',
      backgroundColor: 'var(--heading-bg)',
      textAlign: 'center',
      fontSize: '2.5rem',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '40px',
      border: '2px solid var(--highlight)',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    aboutContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    aboutCard: {
      backgroundColor: 'var(--card-bg)',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '70%',
      margin: '10px 0',
      textAlign: 'center',
      border: '1px solid #e0e0e0',
    },
    aboutCardTitle: {
      color: 'var(--highlight)',
      fontSize: '1.8rem',
      padding: '10px',
      marginBottom: '20px',
      transition: 'color 0.3s ease',
    },
    aboutCardTitleHover: {
      color: 'var(--primary)',
      textDecoration: 'underline',
    },
    aboutCardText: {
      fontSize: '1.2rem',
      lineHeight: '1.6',
      color: '#555',
      marginBottom: '20px',
    },
    button: {
      padding: '12px 25px',
      backgroundColor: 'var(--button-bg)',
      color: 'white',
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: 'var(--button-hover-bg)',
    },
    footer: {
      textAlign: 'center',
      marginTop: '40px',
    },
    footerText: {
      fontSize: '1rem',
      color: '#777',
    },
    footerLink: {
      color: 'var(--link-color)',
      textDecoration: 'none',
    },
    footerLinkHover: {
      textDecoration: 'underline',
    },
    featureSection: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      marginTop: '40px',
    },
    featureCard: {
      backgroundColor: 'var(--card-bg)',
      width: '30%',
      margin: '15px',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      border: '1px solid #e0e0e0',
    },
    featureCardImg: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      marginBottom: '20px',
    },
    address: {
      backgroundColor: 'var(--card-bg)',
      padding: '20px',
      marginTop: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '50%',
      margin: '30px auto',
    },
    faqSection: {
      marginTop: '40px',
      width: '70%',
      margin: 'auto',
    },
    faqCard: {
      backgroundColor: 'var(--box-bg)',
      padding: '15px',
      margin: '15px 0',
      borderRadius: '8px',
      border: '2px solid var(--box-border)',
      transition: 'transform 0.3s ease',
    },
    faqCardHover: {
      transform: 'scale(1.05)',
    },
    faqCardTitle: {
      fontSize: '1.5rem',
      color: 'var(--heading-color)',
      fontWeight: 600,
      marginBottom: '10px',
    },
    faqCardText: {
      fontSize: '1.1rem',
      color: 'var(--effect-color)',
      lineHeight: '1.6',
    },
  };

  return (
    <div style={styles.body}>
      <h1 style={styles.h1}>The Fitness Freak Diet 🏋️‍♀️🍎</h1>
      <div style={styles.aboutContainer}>
        <div style={styles.aboutCard}>
          <h2 style={styles.aboutCardTitle}>What is The Fitness Freak Diet?</h2>
          <p style={styles.aboutCardText}>The Fitness Freak Diet is designed for individuals who are passionate about their fitness journey and wish to achieve their personal health and fitness goals. Whether you’re looking to lose weight, gain muscle, or simply adopt a healthier lifestyle, our comprehensive diet plans and fitness programs will help guide you every step of the way.</p>
        </div>

        <div style={styles.aboutCard}>
          <h2 style={styles.aboutCardTitle}>Why Choose Us?</h2>
          <p style={styles.aboutCardText}>We provide personalized diet plans tailored to your goals and preferences. Our team of experts ensures that each plan is scientifically backed, providing you with sustainable and effective strategies. Plus, with our easy-to-use app and support system, you can track your progress and make adjustments whenever you need.</p>
        </div>

        <div style={styles.aboutCard}>
          <h2 style={styles.aboutCardTitle}>Our Mission</h2>
          <p style={styles.aboutCardText}>Our mission is to empower individuals to take control of their health by providing accessible, science-based resources. We aim to build a community of fitness enthusiasts who support each other in achieving their goals and maintaining a healthy lifestyle.</p>
        </div>

        <div style={styles.address}>
          <h2>Our Address</h2>
          <p>Fitness Freak Diet HQ</p>
          <p>123 Wellness Lane, Health City, Fitness Country, 12345</p>
          <p>Phone: 123-456-7890</p>
          <p>Email: contact@fitnessfreak.com</p>
        </div>

        <div style={styles.aboutCard}>
          <h2 style={styles.aboutCardTitle}>Our App</h2>
          <p style={styles.aboutCardText}>Our mobile app is designed to make your fitness journey even easier! Available for both iOS and Android, the app allows you to access personalized meal plans, track your progress, and receive tips from experts on the go!</p>
          <a href="https://www.apple.com/app-store/" target="_blank" style={styles.button}>Download on the App Store</a>
          <a href="https://play.google.com/store" target="_blank" style={{ ...styles.button, marginTop: '10px' }}>Get it on Google Play</a>
        </div>

        <div style={styles.featureSection}>
          <div style={styles.featureCard}>
            <img src="https://via.placeholder.com/100" alt="Personalized Plans" style={styles.featureCardImg} />
            <h3>Personalized Plans</h3>
            <p>Tailored fitness and diet plans to suit your unique needs and preferences.</p>
          </div>
          <div style={styles.featureCard}>
            <img src="https://via.placeholder.com/100" alt="Expert Guidance" style={styles.featureCardImg} />
            <h3>Expert Guidance</h3>
            <p>Guidance from certified fitness professionals to help you stay on track.</p>
          </div>
          <div style={styles.featureCard}>
            <img src="https://via.placeholder.com/100" alt="Progress Tracking" style={styles.featureCardImg} />
            <h3>Progress Tracking</h3>
            <p>Track your goals and progress in real-time with our easy-to-use app.</p>
          </div>
        </div>

        <div style={styles.faqSection}>
          <div style={styles.faqCard}>
            <h3 style={styles.faqCardTitle}>What is the calorie count feature?</h3>
            <p style={styles.faqCardText}>Our app comes with a built-in calorie counter that helps you track your daily caloric intake. Simply input your food items, and the app will calculate the calories, ensuring that you stay within your goal range for weight loss or gain!</p>
          </div>
          <div style={styles.faqCard}>
            <h3 style={styles.faqCardTitle}>How can I get personalized workout plans?</h3>
            <p style={styles.faqCardText}>By signing up with us, you’ll get access to personalized workout plans designed by fitness experts based on your goals, fitness level, and preferences.</p>
          </div>
          <div style={styles.faqCard}>
            <h3 style={styles.faqCardTitle}>Can I use this for weight gain?</h3>
            <p style={styles.faqCardText}>Yes! Our diet plans are customizable for weight gain as well. With our calorie-dense meal options and proper workout guidance, you can effectively achieve your weight gain goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
