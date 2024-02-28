import React,  { useState, useEffect } from 'react';
import '../styles/PresentationList.css'
import Image1 from '../assets/pres1.jpeg';
import { getClasses } from '../api/class.api.js';

const PresentationList = () => {
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classesData = await getClasses();
      setPresentations(classesData);
    };

    fetchClasses();
  }, []);
  return (
  <div className="presentation--list">
    <div className='list--header'>
        <h2>Recent Presentations</h2>
        <select>
          <option value="english">English</option>
          <option value="maths">Spanish</option>
          <option value="physics">French</option>
          <option value="chemistry">Italian</option>
        </select>
    </div>
    <div className='list--container'>
      {presentations.map((presentation) => (
        <div className='list' key={presentation.id}>
          <div className='presentation--detail'>
            <img src={Image1} alt={presentation.ClassName} />
            <h2>{presentation.ClassName}</h2>
          </div>
          <span>{presentation.ClassGroupName}</span>
          <span>{presentation.Topic}</span>
          <a 
            href={`http://localhost:3005/class/download/${presentation.id}.pptx`} 
            download 
          >
            Download
          </a>
        </div>
      ))}
    </div>
  </div>
  );
};

export default PresentationList;