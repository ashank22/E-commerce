import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Home from './pages/Home';
import {Routes,Route} from 'react-router-dom'
function App() {

  return (
    
    <div className=" h-full">
    <Home/>
    </div>
  );
}

export default App;
