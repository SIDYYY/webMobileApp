import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>🚀 Hi Qtie </h1>
      <p>Start exploring by clicking me.</p>
      <Link to="/login">
        <button className="get-started-btn">Get Started</button>
      </Link>
    </div>
  );
}

export default Dashboard;
