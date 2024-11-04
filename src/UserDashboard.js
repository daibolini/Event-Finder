import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css';

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  //fetch events on component mount
  useEffect(() => {
    axios.get('/EventFinderRESTProject/rest/events')
      .then(response => {
        setEvents(response.data);
        setFilteredEvents(response.data); //initialize filteredEvents with all events
      })
      .catch(error => {
        console.error('Error fetching events', error);
      });
  }, []);

  //filter events based on search criteria
  const handleSearch = () => {
    const results = events.filter(event => {
      const eventDate = new Date(event.date); //convert event.date to a Date object
      const userDate = date ? new Date(date) : null; //convert user input to a Date object if provided

      return (
        (location ? event.location?.toLowerCase().includes(location.toLowerCase()) : true) &&
        (userDate ? eventDate.toDateString() === userDate.toDateString() : true) && 
        (genre ? event.genre?.toLowerCase().includes(genre.toLowerCase()) : true)
      );
    });
    setFilteredEvents(results);
  };

    return (
      <div className="dashboard-container">
        <div className="banner">
            <h1>Event Finder</h1>
            {/* <button className="logout-button"></button> */}
        </div>

        <div className="search-bar">
            <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
            <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>

        <div className="event-list">
            {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
                <div key={event.id} className="event-card">
                <h2>{event.eventName}</h2>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Genre:</strong> {event.genre}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">Buy Tickets</a>
                </div>
            ))
            ) : (
            <p>No events available</p>
            )}
        </div>
       </div>
    );
}

export default UserDashboard;