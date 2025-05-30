import React, { useState } from 'react';

const Support = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is the best plan for weight loss? 🏃‍♀️',
      answer:
        'We recommend focusing on a balanced diet with a mix of protein-rich foods, healthy fats, and regular exercise. Check out our weight loss plan section for more details!',
    },
    {
      question: 'Can I contact support anytime? 📞',
      answer:
        'Yes, our customer support is available 24/7. You can reach us through the contact form above or via email at support@ourwebsite.com.',
    },
    {
      question: 'Do you offer personalized diet plans? 🍏',
      answer:
        'Yes! We provide customized diet plans based on your goals, preferences, and medical history. Feel free to contact us for more details.',
    },
    {
      question: 'How do I track my progress? 📊',
      answer:
        "You can track your weight and nutrition progress using our app's progress tracker. It provides daily updates and personalized tips based on your data!",
    },
    {
      question: 'How can I cancel my subscription? ❌',
      answer:
        'If you wish to cancel your subscription, please visit your account settings and follow the cancellation procedure. Alternatively, contact our support team for assistance.',
    },
    {
      question: 'Do you have a mobile app? 📱',
      answer:
        'Yes! We offer a mobile app for both Android and iOS to help you stay on top of your health goals on the go. Download it from the App Store or Google Play!',
    },
  ];

  return (
    <div style={styles.body}>
      <h1 style={styles.header}>Customer Support 🧑‍💻💬</h1>

      <div style={styles.supportContainer}>
        {/* General Support */}
        <div style={styles.supportCard}>
          <h2 style={styles.cardTitle}>General Support</h2>
          <p>
            If you have any general inquiries, you can reach out to us through this contact form. Our support team will
            get back to you as soon as possible.
          </p>
          <div style={styles.contactForm}>
            <form>
              <input type="text" name="name" placeholder="Your Name" required style={styles.inputField} />
              <input type="email" name="email" placeholder="Your Email" required style={styles.inputField} />
              <textarea name="message" rows="5" placeholder="Your Message" required style={styles.textArea}></textarea>
              <button type="submit" style={styles.submitButton}>
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={styles.supportCard}>
          <h2 style={styles.cardTitle}>Frequently Asked Questions (FAQs) 📚</h2>

          <div style={styles.faqSection}>
            {faqs.map((faq, index) => (
              <div key={index}>
                <div style={styles.faqItem} onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span style={styles.arrow}>{activeFaq === index ? '◁' : '▶'}</span>
                </div>
                {activeFaq === index && (
                  <div style={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#f4f9f9',
    color: '#333',
    margin: 0,
    padding: '40px',
  },
  header: {
    color: '#ff8c42',
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '40px',
  },
  supportContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  supportCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '40%',
    margin: '10px 0',
    textAlign: 'center',
  },
  cardTitle: {
    color: '#ff8c42',
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  contactForm: {
    textAlign: 'left',
  },
  inputField: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textArea: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#f7b733',
    color: 'white',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  faqSection: {
    width: '100%',
    marginTop: '40px',
  },
  faqItem: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.1rem',
  },
  arrow: {
    transition: 'transform 0.3s ease',
  },
  faqAnswer: {
    padding: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    marginTop: '10px',
    color: '#555',
  },
};

export default Support;
