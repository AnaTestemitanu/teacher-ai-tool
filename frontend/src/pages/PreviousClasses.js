import React, { useState, useEffect } from 'react';
import '../styles/PreviousClasses.css'
import Sidebar from '../components/Sidebar';
import { getClasses } from '../api/class.api.js';
import Image1 from '../assets/pres1.jpeg';


const PreviousClasses = () => {
  const [presentations, setPresentations] = useState([]);
  const [starred, setStarred] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classesData = await getClasses();
      setPresentations(classesData);
      setStarred(new Array(classesData.length).fill(false));
    };

    fetchClasses();
  }, []);

  const toggleStarred = index => {
    const newStarred = [...starred];
    newStarred[index] = !newStarred[index];
    setStarred(newStarred);
  };

  return (
    <div className='classes-container'>
      <Sidebar />
      <div className="pres--list">
        <div className='pres--header'>
          <h2>Previous Classes</h2>
          <select>
            <option value="english">English</option>
            <option value="maths">Spanish</option>
            <option value="physics">French</option>
            <option value="chemistry">Italian</option>
          </select>
        </div>
        <div className='pres--container'>
          {presentations.map((presentation, index) => (
            <div className='list' key={presentation.id}> {/* Use unique ID if available */}
              <div className='pres--detail--box'>
                <div className='pres--detail'>
                  <img src={Image1} alt={presentation.ClassName} />
                  <h2>{presentation.ClassName}</h2>
                </div>
                <div className='actions'>
                  <span className='star' onClick={() => toggleStarred(index)}>
                    {starred[index] ? "★" : "☆"}
                  </span>
                  <a 
                    href={`http://localhost:3005/class/download/${presentation.id}.pptx`} 
                    download 
                    className='star'
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousClasses;
