//import React from 'react';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import './index.css';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/dashboard' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
