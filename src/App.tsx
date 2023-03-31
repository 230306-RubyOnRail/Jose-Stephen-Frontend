import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestComponent from "./Components/TestComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container, Navbar} from "react-bootstrap";
import NavbarComponent from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <TestComponent/>


    </div>
  );
}

export default App;
