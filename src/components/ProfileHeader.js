import React from 'react';
import { BiEdit } from 'react-icons/bi'

const ProfileHeader = () => {
  return (
  <div className='profile--header'>
    <h2 className='header--title'>Profile</h2>
    <div className='edit'>
        <BiEdit className='icon' />
    </div>
  </div>
  );
};

export default ProfileHeader;