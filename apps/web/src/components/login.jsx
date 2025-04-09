import React, { useState } from 'react';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  signInWithEmailAndPassword,
  doc,
  getDoc
} from '../config/config'; // adjust path if needed

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Optionally fetch user's role from Firestore
      const docRef = doc(auth, 'users', user.uid); // adjust if you use a different collection
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userRole = docSnap.data().role;
        localStorage.setItem('userRole', userRole); // or AsyncStorage if you use the same file for mobile
        navigate('/screens/home'); // redirect after login
      } else {
        setErrorMsg('No user role found.');
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMsg('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Link className="back" to="/">X</Link>
        <h2 className="login-head">Log In</h2>
        <form className="login-form" onSubmit={handleLogin}>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          <label className="user">Email</label>
          <input
            type="text"
            className="user-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="password">Password</label>
          <input
            type="password"
            className="pass-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">Submit</button>

          <p className="option">
            Don't have an account yet?
            <Link className="register-link" to="/register"> Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
