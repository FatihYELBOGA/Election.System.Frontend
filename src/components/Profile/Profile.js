import React from 'react';
import './Profile.css'; // Import the CSS file for styling

function Profile() {
  // Sample user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'I am a software engineer with a passion for web development.',
    avatar: 'https://example.com/avatar.jpg', // URL to the user's avatar image
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="User Avatar" className="avatar" />
        <h1>{user.name}</h1>
      </div>
      <div className="profile-body">
        <h2>Email</h2>
        <p>{user.email}</p>
        <h2>Bio</h2>
        <p>{user.bio}</p>
      </div>
    </div>
  );
}

export default Profile;