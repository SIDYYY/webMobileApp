import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/intro.css'; 
import logo from '../assets/images/pet-removebg-preview-removebg-preview.png';

function Dashboard() {
  return (
    <div className="splash-container">
      <img src={logo} alt="Logo" className="splash-logo" />
      {/* <h2 className="splash-text">Loading...</h2>
      <div className="spinner"></div> */}
      <Link to="/login">
        <button className="get-started-btn">Get Started</button>
      </Link>
    </div>
  );
}

export default Dashboard;