import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

function SignUp({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/EventFinderRESTProject/rest/users/addUser', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      })
    });  
    
    if (!response.ok) {
      throw new Error("Signup failed");
    }

    else {
      navigate("/signin");
    }
  };

  return (
    <div className="signup-container">
      <div className="logo">
        <img src="https://static.thenounproject.com/png/3466858-200.png" alt="Musical Icon" />
      </div>
      <h2>Signup to create an account</h2>
      <p>Already have an account? <a href="/signin">Login</a></p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)} 
          required 
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignUp;