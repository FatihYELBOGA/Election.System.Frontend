import './App.css';
import NavBar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Vote from './components/Vote/Vote'
import Candidacy from './components/Candidacy/Candidacy'
import Profile from './components/Profile/Profile'
import { useState } from 'react';


function App() 
{
  const[userId, setUserId] = useState(0);
  if(userId === 0){
    return(
      <div className='App'>
        <BrowserRouter>
          <Routes>
          <Route exact path='/login' element={<Login userId={userId} setUserId={setUserId} />} />
          </Routes>
        </BrowserRouter>

      </div>
    );

  }else{
    return (
      <div className="App">
        
        <BrowserRouter>
          <NavBar></NavBar>
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
