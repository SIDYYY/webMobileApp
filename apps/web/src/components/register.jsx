import React from 'react';
import '../styles/register.css'
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="login-container">
      <div className="login-box">
        <Link className="back" to ="/"> X </Link>
        <h2 className='login-head'> Register </h2>
        <form className='login-form'>
          <label className='user'> Email </label>
          <input type='text' className='user-input' required></input>
        
          <label className='password'> Password </label>
          <input type='password' className='pass-input'  required ></input>

          <label className='confirm-password'> Confirm Password </label>
          <input type='password' className='confirm-pass-input'  required ></input>

          <button className='login-button'> Submit </button>

          <p className='option'> Already have an account? <Link className='register-link' to ="/login"> Login Now </Link> </p>
        </form>
      </div>
    </div>
  );
}

export default App;
