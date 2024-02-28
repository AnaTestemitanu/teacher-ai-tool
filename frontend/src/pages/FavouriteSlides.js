import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/FavouriteSlides.css'
import Slide1 from '../assets/slide1.png';
import Slide2 from '../assets/slide2.png';

// Store initial slides
const initialSlides = [
  {
    image: Slide1,
    name: "Shapes Template Slide",
    date: "Added 12/09/2023" // replace with actual date
  },
  {
    image: Slide2,
    name: "Ombre Shades Slide",
    date: "Added 10/01/2022" // replace with actual date
  },
  // Add more slides as necessary
];

const FavouriteSlides = () => {
  const [slides] = useState(initialSlides); 

  const handleUpload = (event) => {
    console.log(event.target.files[0]); 
    // code to handle the file once uploaded and logic to save it to state / backend goes here.
  };

  const handleSelectChange = (index, event) => {
    console.log(`Slide at index ${index} action: ${event.target.value}`);
    // Implement edit, view, delete actions here
  };

  return (
    <div className='slides-container'>
      <Sidebar />
      <div className='slides--list'>
        <h2>Favourite Slides</h2>
        <div className='upload-slide'>
          <label htmlFor="upload-button">
            <h3>Upload a new slide</h3>
          </label>
          <input id="upload-button" type='file' accept="image/*"  onChange={handleUpload} />
        </div>
        <div className='slide--container'>
          {slides.map((slide, index) => (
            <div className='grid' key={index}>
              <img src={slide.image} alt={slide.name} />
              <h2>{slide.name}</h2>
              <span>{slide.date}</span>
              <select className='slide-actions' onChange={e => handleSelectChange(index, e)}>
                <option value="" disabled selected>Pick an action</option>
                <option value="edit">Edit</option>
                <option value="view">View</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouriteSlides;