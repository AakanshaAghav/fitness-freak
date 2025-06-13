import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCamera } from 'react-icons/fa';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    email: '',
    password: '',
    city: '',
    country: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    sugarStatus: ''
  });

  const loggedInEmail = localStorage.getItem('email'); // Make sure this is set at login

  useEffect(() => {
    if (loggedInEmail) {
      axios.get(`http://localhost:5000/user/profile?email=${loggedInEmail}`)
        .then(res => {
          setFormData(res.data); // sets full user object
        })
        .catch(err => console.error('Error loading profile:', err));
    }
  }, [loggedInEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put('http://localhost:5000/user/update-profile', formData);
      alert('Profile updated successfully!');
      setFormData(res.data.user); // updated user returned from backend
    } catch (err) {
      alert('Update failed!');
      console.error(err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#E8F0FE', padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: '30px', maxWidth: '1300px', width: '100%' }}>
        {/* Sidebar */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', width: '300px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '100px', margin: 'auto' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Tim_Cook_2023.jpg" alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#1E90FF', padding: '6px', borderRadius: '50%', color: 'white', fontSize: '12px', cursor: 'pointer' }}>
              <FaCamera />
            </div>
          </div>
          <h2 style={{ marginTop: '10px', fontSize: '18px' }}>{formData.firstName}</h2>
          <p style={{ color: 'gray', fontSize: '14px' }}>Fitness Enthusiast</p>
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Workouts Completed</span><span style={{ fontWeight: 'bold', color: 'green' }}>45</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}><span>Calories Burned</span><span style={{ fontWeight: 'bold', color: 'orange' }}>12,500</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}><span>Weekly Goal</span><span style={{ fontWeight: 'bold' }}>5/7</span></div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '30px', borderRadius: '10px' }}>
          <div style={{ display: 'flex', gap: '30px', fontWeight: 'bold', fontSize: '14px', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
            <div style={{ color: '#1E90FF', borderBottom: '2px solid #1E90FF', paddingBottom: '5px' }}>Account Settings</div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {[
              { label: 'Name', name: 'firstName' },
              { label: 'Phone Number', name: 'phone' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Password', name: 'password', type: 'password' },
              { label: 'Age', name: 'age', type: 'number' },
              { label: 'Height (cm)', name: 'height', type: 'number' },
              { label: 'Weight (kg)', name: 'weight', type: 'number' }
            ].map(({ label, name, type = 'text' }) => (
              <div key={name} style={{ width: 'calc(50% - 10px)', display: 'flex', flexDirection: 'column' }}>
                <label>{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleChange}
                  style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
            ))}

            <div style={{ width: 'calc(50% - 10px)', display: 'flex', flexDirection: 'column' }}>
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* <div style={{ width: 'calc(50% - 10px)', display: 'flex', flexDirection: 'column' }}>
              <label>Sugar Status</label>
              <select name="sugarStatus" value={formData.sugarStatus} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
                <option value="">Select</option>
                <option>Normal</option>
                <option>Prediabetic</option>
                <option>Diabetic</option>
              </select>
            </div> */}

            <div style={{ width: 'calc(50% - 10px)', display: 'flex', flexDirection: 'column' }}>
              <label>City</label>
              <input name="city" value={formData.city} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ width: 'calc(50% - 10px)', display: 'flex', flexDirection: 'column' }}>
              <label>Country</label>
              <input name="country" value={formData.country} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>
          </div>

          <button onClick={handleUpdate} style={{ marginTop: '20px', backgroundColor: '#1E90FF', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px' }}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
