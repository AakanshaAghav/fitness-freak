import React, { useState, useEffect } from 'react';

const WeightLossDiary = () => {
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Load entries from localStorage when component mounts
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    setEntries(savedEntries);
  }, []);

  const saveEntry = () => {
    if (!date || !note.trim()) {
      alert("Please fill in both date and your entry.");
      return;
    }

    const newEntry = { date, note };
    const updatedEntries = [newEntry, ...entries];
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));

    setEntries(updatedEntries);
    setNote('');
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🌿 My Weight Loss Diary</h1>

      <div style={styles.diaryContainer}>
        <label htmlFor="date" style={styles.label}>📅 Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />

        <label htmlFor="note" style={styles.label}>📝 Your Thoughts / Progress</label>
        <textarea
          id="note"
          rows="5"
          placeholder="Write how you felt today, what you ate, how much you exercised..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={styles.textarea}
        ></textarea>

        <button onClick={saveEntry} style={styles.button}>Save Entry</button>

        <hr style={styles.hr} />

        <h2 style={styles.previousEntriesHeader}>📔 Previous Entries</h2>
        <div id="entries">
          {entries.map((entry, index) => (
            <div key={index} style={styles.entry}>
              <div style={styles.entryDate}>{entry.date}</div>
              <button
                onClick={() => deleteEntry(index)}
                style={styles.deleteButton}
              >
                Delete
              </button>
              <p>{entry.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#e6f7f4',  // light blue-green
    color: '#333',
    padding: '40px',
  },
  header: {
    textAlign: 'center',
    color: '#ff8c42',  // soft orange
    fontSize: '2.7rem',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    marginBottom: '40px',
  },
  diaryContainer: {
    maxWidth: '750px',
    margin: 'auto',
    background: '#ffffff',  // white background for diary container
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '10px 10px 20px rgba(105, 192, 180, 0.2)',
    transition: 'transform 0.3s ease',
  },
  diaryContainerHover: {
    transform: 'translateY(-3px)',
  },
  label: {
    fontWeight: 'bold',
    margin: '20px 0 8px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '14px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '2px solid #69c0b4',  // blue-green
    marginBottom: '20px',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
    transition: 'border-color 0.3s',
  },
  textarea: {
    width: '100%',
    padding: '14px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '2px solid #69c0b4',  // blue-green
    marginBottom: '20px',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
    transition: 'border-color 0.3s',
  },
  button: {
    backgroundColor: '#f7b733',  // yellow
    color: '#fff',
    padding: '14px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 600,
    boxShadow: '0 6px 12px rgba(247, 183, 51, 0.3)',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: '#f5a623',
    transform: 'translateY(-2px)',
  },
  hr: {
    margin: '30px 0',
    border: '1px dashed #ccc',
  },
  previousEntriesHeader: {
    color: '#ff8c42',  // soft orange
    marginBottom: '15px',
  },
  entry: {
    background: '#ffffff',  // white background
    marginTop: '20px',
    padding: '20px',
    borderLeft: '6px solid #69c0b4',  // blue-green
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(105, 192, 180, 0.15)',
  },
  entryDate: {
    fontWeight: 'bold',
    color: '#ff8c42',  // soft orange
    marginBottom: '10px',
  },
  deleteButton: {
    float: 'right',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    boxShadow: '0 2px 4px rgba(255, 77, 77, 0.3)',
  },
  deleteButtonHover: {
    backgroundColor: '#cc0000',
  },
};

export default WeightLossDiary;
