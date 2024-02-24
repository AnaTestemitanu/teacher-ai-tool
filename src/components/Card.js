import React from 'react';
import { BiBarChart, BiMath, BiAward } from 'react-icons/bi';

const courses = [
    {
        title: 'one',
        icon: <BiMath />
    },
    {
        title: 'two',
        duration: '2 hours',
        icon: <BiBarChart />
    },
    {
        title: 'three',
        duration: '2 hours',
        icon: <BiAward />
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