import React, { useState } from 'react';
import './SignUp.css';

function SignUp({ onAuthSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
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



// import React, { useState } from 'react';
// import axios from 'axios';

// function SignUp() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSignUp = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match!');
//       return;
//     }

//     const newUser = { username, email, password };

//     axios.post('http://localhost:8080/EventFinderRESTProject/rest/users/signup', newUser)
//       .then(response => {
//         setMessage('Account created successfully!');
//         // Clear the form
//         setUsername('');
//         setEmail('');
//         setPassword('');
//         setConfirmPassword('');
//       })
//       .catch(error => {
//         console.error('There was an error creating the account!', error);
//         setMessage('Error creating account.');
//       });
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSignUp}>
//         <label>Username:</label>
//         <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />

//         <label>Email:</label>
//         <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

//         <label>Password:</label>
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

//         <label>Confirm Password:</label>
//         <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

//         <button type="submit">Sign Up</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default SignUp;