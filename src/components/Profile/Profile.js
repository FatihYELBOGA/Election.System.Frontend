import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile(props) {

  const userId = props.userId;
  const [user, setUser] = useState(null);
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshUserId = () => {
    return fetch("http://fatihyelboga-001-site1.atempurl.com/student/" + userId)
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
          <p>Username: {user.username}</p>
          <p>Gender: {user.gender}</p>
          <p>GPA: {user.gpa}</p>
          <p>Department: {user.department.name}</p>
          <p>Faculty: {user.department.faculty.name}</p>
        </div>
      </div>
    );
  }
}

export default Profile;