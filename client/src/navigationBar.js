//import './App.css';
import App from './App';
import {Routes, Route, useNavigate} from 'react-router-dom';
import React, { useState } from 'react';

function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div>
        <button key={1} onClick={() => navigate('/home')}>Home Page</button>
        <button key={2} onClick={() => navigate('/add')}>Add Post</button>
        <button key={3} onClick={() => navigate('/search')}>Search Post</button>
        <button key={4} onClick={() => navigate('/update')}>Update Post</button>
    </div>
  );
}

export default NavigationBar;
