import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from './SignUp';
import SignIn from './SignIn';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import '../src/App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const [userRole, setUserRole] = useState(''); 

  useEffect(() => {
    axios.get('/EventFinderRESTProject/rest/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching events!', error);
      });
  }, []);

  const handleAuthSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role); // role is 'user' or 'admin'
  };

  return (
    <Router>
      <div>
        {/*conditionally render the navbar only if the user is authenticated */}
        {isAuthenticated && (
          <nav className="navbar">
            <button className="logout-button" onClick={() => {
             setIsAuthenticated(false);
             setUserRole('');
           }}>Logout</button>
          </nav>        
        )}

        <Routes>
          <Route path="/signup" element={!isAuthenticated ? <SignUp onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/" />} />
          <Route path="/signin" element={!isAuthenticated ? <SignIn onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/" />} />

          <Route path="/" element={
            isAuthenticated ? (
              userRole === 'admin' ? <AdminDashboard /> : <UserDashboard events={events} />
            ) : <Navigate to="/signin" />
          } />

          {/*admin dashboard route*/}
          <Route path="/admin" element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;