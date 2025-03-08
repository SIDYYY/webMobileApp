import React from 'react';
import '../styles/login.css'
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="login-container">
      <div className="login-box">
        <Link className="back" to ="/"> X </Link>
        <h2 className='login-head'> Log In </h2>
        <form className='login-form'>
          <label className='user'> Email </label>
          <input type='text' className='user-input' required></input>

          <label className='password'> Password </label>
          <input type='password' className='pass-input'  required ></input>

          <button className='login-button'> Submit </button>

          <p className='option'> Don't have an account yet? <Link className='register-link' to ="/register"> Register Now</Link> </p>
        </form>
      </div>
    </div>
  );
}

export default App;
