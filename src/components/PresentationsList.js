import React from 'react';
import '../styles/PresentationList.css'
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

const PresentationList = () => {
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
        <div className='list'>
          <div className='presentation--detail'>
            <img src={presentation.image} alt={presentation.name} />
            <h2>{presentation.name}</h2>
          </div>
          <span>{presentation.duration}</span>
          <span>{presentation.cost}</span>
          <span className='teacher--todo'>:</span>
        </div>
      ))}
    </div>
  </div>
  );
};

export default PresentationList;