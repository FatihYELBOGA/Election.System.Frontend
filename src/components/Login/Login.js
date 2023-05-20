import React, { useState } from "react";
import "./Login.css";

function Login (props)  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
        fetch("http://fatihyelboga-001-site1.atempurl.com/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName : email,
                password : password,
            }),
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    
  };

  return (
    <div className="login-page">
      <h2>Login to IZTECH Election System</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button 
        type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;