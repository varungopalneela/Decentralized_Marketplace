import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css'; // Import your CSS file
import Wallet from './Wallet'

function Profile() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const storedUsername = localStorage.getItem('ExistUser');

    axios.post("http://localhost:3500/users-api/userDetails", { storedUsername })
      .then(res => setCurrentUser(res.data.userDetails))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='profile-container'>
      <h1 className='profile-heading'>Profile</h1>
      <div className='profile-card'>
        <p className='profile-info'><span className='profile-label'>Name:</span> {currentUser?.username}</p>
        <p className='profile-info'><span className='profile-label'>Email:</span> {currentUser?.email}</p>
        <p className='profile-info'><span className='profile-label'>Gender:</span> {currentUser?.gender}</p>
      </div>
      <Wallet></Wallet>
    </div>
  );
}

export default Profile;