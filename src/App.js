import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Vote from './components/Vote/Vote'
import Candidacy from './components/Candidacy/Candidacy'
import Profile from './components/Profile/Profile'
import { useState } from 'react';

function App() 
{
  const[userId, setUserId] = useState(0);
  const[role, setRole] = useState(null);

  if(userId === 0){
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login setUserId={setUserId} setRole={setRole} />} />
        </Routes>
      </BrowserRouter>
    );
  } else if(role === "STUDENT") {
    return (
      <div className="App">
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/voting' element={<Vote/>}/>
            <Route exact path='/candidacy-application' element={<Candidacy/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
