import React, { useState } from 'react';
import '../src/SignIn.css';

function SignIn({ onAuthSuccess}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/EventFinderRESTProject/rest/users/login', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data);
      //guardar el token y el rol en el localStorage o state
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role); //guardar el rol
      
      if (data.role === 'admin') {
        onAuthSuccess('admin');
      } else {
        onAuthSuccess('user');
      }
    } catch (error) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="signin-container">
      <div className="logo">
        <img src="https://static.thenounproject.com/png/3466858-200.png" alt="Musical Icon" />
      </div>
      <h2>Login to your account</h2>
      {error && <p className="error-message">{error}</p>}
      <p>Don't have an account yet? <a href="/signup">Signup</a></p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <div className="form-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SignIn;