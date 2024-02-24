import React from 'react';
import { BiBarChart, BiMath, BiPlanet } from 'react-icons/bi';

const courses = [
    {
        title: 'Maths',
        icon: <BiMath />
    },
    {
        title: 'Statistics',
        duration: '2 hours',
        icon: <BiBarChart />
    },
    {
        title: 'Astronomy',
        duration: '2 hours',
        icon: <BiPlanet />
    },
]

const Card = () => {
  return (
  <div className='card--container'>
    {courses.map((item) => (
        <div className='card'>
            <div className='card--cover'>{item.icon}</div>
            <div className='card--title'>
                <h2>{item.title}</h2>
            </div>
        </div>
    ))}
  </div>
  );
};

export default Card;