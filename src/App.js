import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Login from './components/Login/Login'
import Home from './components/Student/Home/Home'
import Vote from './components/Student/Vote/Vote'
import Candidacy from './components/Student/Candidacy/Candidacy'
import Profile from './components/Profile/Profile'
import AnnouncementAdmin from './components/Admin/Announcement/AnnouncementAdmin'
import CandidacyApplication from './components/Admin/CandidacyApplication/CandidacyApplication';
import Process from './components/Admin/Processes/Process';
import User from './components/Admin/User/User';
import { useState } from 'react';

function App() 
{

  const[userId, setUserId] = useState(0);
  const[role, setRole] = useState(null);

  if(userId === 0){
    return (
      
      <BrowserRouter>
      
        <Routes>
          <Route exact path='/' element={<Login setUserId={setUserId} setRole={setRole} />}  />
        </Routes>
        
      </BrowserRouter>
    );
  } else if(role === "STUDENT") {
    return (
      <div className="App">
        
        <BrowserRouter>
        <NavBar setUserId={setUserId} userId={userId} role={role} />
          <Routes>
            <Route exact path='/home' element={<Home />}/>
            <Route exact path='/voting' element={<Vote/>}/>
            <Route exact path='/candidacy-application' element={<Candidacy/>}/>
            <Route exact path='/profile' element={<Profile userId={userId} role={role} />}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }else if(role === "STUDENT_AFFAIR"){
    return (
      <div className="App">
        
        <BrowserRouter>
        <NavBar setUserId={setUserId} userId={userId} role={role} />
          <Routes>
            <Route exact path='/announcements' element={<AnnouncementAdmin />}/>
            <Route exact path='/processes' element={<Process/>}/>
            <Route exact path='/candidacy-applications' element={<CandidacyApplication/>}/>
            <Route exact path='/users' element={<User/>}/>
            <Route exact path='/profile' element={<Profile userId={userId} role={role}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );

  }
}

export default App;
