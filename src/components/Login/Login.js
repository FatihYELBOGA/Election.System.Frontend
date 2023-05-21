import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login (props)  
{
  const navigate = useNavigate();
  const{setUserId, setRole} = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    fetch("http://fatihyelboga-001-site1.atempurl.com/login",
    {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body : JSON.stringify({
        username : email,
        password : password,
      }),    
      referrerPolicy: "unsafe_url" 
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.userId != null){
        setUserId(res.userId);
        setRole(res.role);
        navigate("/home");
      } else {
        alert(res.message);
      }
    })
    .catch((err) => console.log(err))
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;