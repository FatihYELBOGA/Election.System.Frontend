import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile(props) {

  const userId = props.userId;
  const [user, setUser] = useState(null);
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshUserId = () => {
    return fetch("https://iyte-election.azurewebsites.net/student/" + userId)
      .then((res) => res.json())
      .then(
        (user) => {
          setIsLoaded(true);
          setUser(user);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  
  useEffect(() => {
    refreshUserId();
  });

  if(user != null){
    return (
      <div className="profile-container">
        <div className="profile-header">
          {
            user.middleName === null ? 
            (<h1>{user.firstName + " " + user.lastName}</h1>) : 
            (<h1>{user.firstName + " " + user.middleName + " " + user.lastName}</h1>)
          }
        </div>
        <div className="profile-body">
          <div className='profile-element'> <h4>Username</h4> <p> {user.username}</p></div>
          <div className='profile-element'> <h4>Gender</h4> <p> {user.gender}</p></div>
          <div className='profile-element'> <h4>GPA</h4> <p> {user.gpa}</p></div>
          <div className='profile-element'> <h4>Department</h4> <p> {user.department.name}</p></div>
          <div className='profile-element'> <h4>Faculty</h4> <p> {user.department.faculty.name}</p></div>
          
        </div>
      </div>
    );
  }
}

export default Profile;