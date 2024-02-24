import React, { useState } from 'react';
import '../styles/PreviousClasses.css'
import Sidebar from '../components/Sidebar';
import Image1 from '../assets/pres1.jpeg';
import Image2 from '../assets/pres2.png';
import Image3 from '../assets/pres3.png';
import Image4 from '../assets/pres4.jpeg';
import Image5 from '../assets/pres5.jpeg';
import Image6 from '../assets/pres6.png';


const presentations = [
    {
        image: Image1,
        name: 'Presentation of Smth',
        duration: '20 hours lesson',
        cost: '£150'
    },
    {
      image: Image2,
      name: 'End a presentation',
      duration: '2 hours lesson',
      cost: '£130'
    },
    {
      image: Image3,
      name: 'Maths Mid School',
      duration: '15 hours lesson',
      cost: '£100'
   },
    {
      image: Image4,
      name: 'History of English',
      duration: '200 hours lesson',
      cost: '£180'
    },
    {
      image: Image5,
      name: 'Physics for Kids',
      duration: '240 hours lesson',
      cost: '£100'
    },
    {
      image: Image6,
      name: 'Chemistry for Adults',
      duration: '60 hours lesson',
      cost: '£1300'
    }
];

const PreviousClasses = () => {
  const [starred, setStarred] = useState(new Array(presentations.length).fill(false));

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
            {
              presentations.map((presentation, index) => (
                  <div className='list'>
                      <div className='pres--detail--box'>
                          <div className='pres--detail'>
                              <img src={presentation.image} alt={presentation.name} />
                              <h2>{presentation.name}</h2>
                          </div>
                          <div className='actions'>
                              <span className='star' onClick={() => toggleStarred(index)}>
                                  {starred[index] ? "★" : "☆"}
                              </span>
                              <select className='class-actions'>
                                  <option value="" disabled selected>Pick an action</option>
                                  <option value="edit">Edit</option>
                                  <option value="view">View</option>
                                  <option value="delete">Delete</option>
                              </select>
                          </div>
                      </div>
                  </div>
              ))
              }
            </div>
        </div>
  </div>
  );
};

export default PreviousClasses;