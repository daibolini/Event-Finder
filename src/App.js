import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from './SignUp';
import SignIn from './SignIn';
import '../src/App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const [userRole, setUserRole] = useState(''); 

  useEffect(() => {
    axios.get('http://localhost:8080/EventFinderRESTProject/rest/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching events!', error);
      });
  }, []);

  // Handle successful login or sign-up
  const handleAuthSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role); // Assume that role is 'user' or 'admin'
  };

  return (
    <Router>
      <div>
        {/* Conditionally render the navbar only if the user is authenticated */}
        {isAuthenticated && (
          <nav>
            <Link to="/">Event List</Link>
            {/* Render different links based on user role */}
            {userRole === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
            <button onClick={() => setIsAuthenticated(false)}>Logout</button>
          </nav>
        )}

        <Routes>
          {/* Conditionally redirect authenticated users to the event list */}
          <Route path="/signup" element={!isAuthenticated ? <SignUp onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/" />} />
          <Route path="/signin" element={!isAuthenticated ? <SignIn onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/" />} />

          {/* Event list for authenticated users */}
          <Route path="/" element={
            isAuthenticated ? (
              <div>
                <h1>Event Finder</h1>
                {events.length > 0 ? (
                  <ul>
                    {events.map(event => (
                      <li key={event.id}>
                        <h2>{event.eventName}</h2>
                        <p>Location: {event.location}</p>
                        <p>Date: {event.date}</p>
                        <p>Genre: {event.genre}</p>
                        <p>Venue: {event.venue}</p>
                        <a href={event.ticketLink}>Buy Tickets</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No events available</p>
                )}
              </div>
            ) : <Navigate to="/signin" />
          } />

          {/* Admin dashboard route (only accessible to admins) */}
          <Route path="/admin" element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

function AdminDashboard() {
  return <h2>Welcome to the Admin Dashboard</h2>;
}

export default App;




// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import axios from 'axios';
// import SignUp from './SignUp';
// import SignIn from './SignIn';

// function App() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/EventFinderRESTProject/rest/events')
//       .then(response => { setEvents(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching events!', error);
//       });
//   }, []);

//   return (
//     <Router>
//       <div>
//         <nav>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/signin">Sign In</Link>
//           <Link to="/">Event List</Link>
//         </nav>

//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/" element={
//             <div>
//               <h1>Event Finder</h1>
//               {events.length > 0 ? (
//                 <ul>
//                   {events.map(event => (
//                     <li key={event.id}>
//                       <h2>{event.eventName}</h2>
//                       <p>Location: {event.location}</p>
//                       <p>Date: {event.date}</p>
//                       <p>Genre: {event.genre}</p>
//                       <p>Venue: {event.venue}</p>
//                       <a href={event.ticketLink}>Buy Tickets</a>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No events available</p>
//               )}
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
