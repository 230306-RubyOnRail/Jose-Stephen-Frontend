import React, {Component, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TestComponent from "./Components/TestComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container, Navbar} from "react-bootstrap";
import NavbarComponent from "./Components/Navbar";
import {User} from "./Components/models/user"
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  const [principal, setPrincipal] = useState<User>();

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* <TestComponent/> */}
        <Route path ="login" element={<Login currentUser={principal} setCurrentUser={setPrincipal}/>}/>
        <Route path='register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
