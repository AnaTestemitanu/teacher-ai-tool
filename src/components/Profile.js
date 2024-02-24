import React from 'react';
import ProfileHeader from './ProfileHeader'
import '../styles/profile.css'
import userImage from '../assets/image.png'
import { BiBookmarkAlt } from 'react-icons/bi'

const courses = [
  {
    title: 'Maths',
    duration: '13h per week',
    icon: <BiBookmarkAlt />,
  },
  {
    title: 'English',
    duration: '3h per week',
    icon: <BiBookmarkAlt />,
  },
  {
    title: 'Chemistry',
    duration: '9h per week',
    icon: <BiBookmarkAlt />,
  }
]

const Profile = () => {
  return (
  <div className='profile'>
    <ProfileHeader />
    <div className='user--profile'>
      <div className='user--detail'>
        <img src={userImage} alt='' />
        <h3 className='username'>Carlos Sad</h3>
        <span className='profession'>Secondary School Teacher</span>
      </div>
      <div className='user-courses'>
        {courses.map((course) => (
          <div className='course'>
            <div className='course-detail'>
            <div className='course-cover'>{course.icon}</div>
            <div className='course-name'>
              <h5 className='title'>{course.title}</h5>
              <span className='duration'>{course.duration}</span>
              </div>  
            </div> 
            <div className='action'>:</div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Profile;