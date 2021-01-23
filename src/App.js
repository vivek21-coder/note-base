import React, {useState} from 'react';
import NavBar from "./components/NavBar/Desktop/NavBar";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import useWindowDimensions from "./components/useWindowDimensions/useWindowDimensions";
import './background.module.css';

import {auth} from "./firebase";

import {Redirect, Route, useLocation} from 'react-router-dom';
import Profile from "./components/Profile/Profile";
import Notes from "./components/Notes/Notes";
import AboutUs from "./components/AboutUs/AboutUs";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(null);
  const location = useLocation();

  auth.onAuthStateChanged(function (user) {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  })

  const {height, width} = useWindowDimensions();

  if (isLoggedIn == null) {
    return null;
  }

  return (

    <div>
      <NavBar isLoggedIn={isLoggedIn} width={width} path={location.pathname}/>
      <div style={{height: '5rem'}}/>

      <Route path='/' exact>
        {isLoggedIn ? <Redirect to='/notes'/> : <Redirect to='/login'/>}
      </Route>
      <Route path='/login'>
        {isLoggedIn ? <Redirect to='/notes'/> : <Login width={width}/>}
      </Route>
      <Route path='/signup'>
        {isLoggedIn ? <Redirect to='/notes'/> : <Signup width={width}/>}
      </Route>
      <Route path='/profile'>
        {!isLoggedIn ? <Redirect to='/'/> : <Profile width={width}/>}
      </Route>
      <Route path='/notes'>
        {!isLoggedIn ? <Redirect to='/'/> : <Notes width={width}/>}
      </Route>
      <Route path='/aboutus'>
        <AboutUs/>
      </Route>

    </div>
  );
}

export default App;
