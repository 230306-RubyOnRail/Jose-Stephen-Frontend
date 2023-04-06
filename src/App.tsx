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
import Reimbursements from './Components/Reimbursements';
import { Reimbursement } from './Components/models/reimbursements';

function App() {
  const [principal, setPrincipal] = useState<User>();
  const [reimbursements, setReimbursements] = useState<Reimbursement>();

  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent />
      <Routes>
        {/* <TestComponent/> */}
        <Route path ="login" element={<Login currentUser={principal} setCurrentUser={setPrincipal}/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='reimbursements' element={<Reimbursements currentUser={principal} reimbursements={reimbursements} setReimbursements={setReimbursements}/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
