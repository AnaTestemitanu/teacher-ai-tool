import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/support.css';

const Support = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with:', formData)
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='support-container'>
      <Sidebar />
      <div className='support-content'>
        <h2>Contact Us</h2>
        <support-form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label>Email:</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <label>Message:</label>
          <textarea 
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          <button type="submit">Submit</button>
        </support-form>
      </div>
    </div>
  );
};

export default Support;