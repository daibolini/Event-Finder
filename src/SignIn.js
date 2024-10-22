import React, { useState } from 'react';
import '../src/SignIn.css';

function SignIn({ onAuthSuccess}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signin-container">
      <div className="logo">
        <img src="https://static.thenounproject.com/png/3466858-200.png" alt="Musical Icon" />
      </div>
      <h2>Login to your account</h2>
      <p>Don't have an account yet? <a href="/signup">Signup</a></p>
      <form onSubmit={handleSubmit}>
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



// import React, { useState } from 'react';
// import axios from 'axios';

// function SignIn() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSignIn = (e) => {
//     e.preventDefault();

//     const userCredentials = { username, password };

//     axios.post('http://localhost:8080/EventFinderRESTProject/rest/users/signin', userCredentials)
//       .then(response => {
//         setMessage('Login successful!');
//         // You can redirect to another page after login
//       })
//       .catch(error => {
//         console.error('There was an error logging in!', error);
//         setMessage('Invalid username or password.');
//       });
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       <form onSubmit={handleSignIn}>
//         <label>Username:</label>
//         <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />

//         <label>Password:</label>
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

//         <button type="submit">Sign In</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default SignIn;
