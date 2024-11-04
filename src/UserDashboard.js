import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './UserDashboard.css';

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
        console.error('Error fetching events!', error);
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
    <div>
      <h1>Event Finder</h1>
      {/* Search form */}
      <div>
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

      {/* Display events */}
      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map(event => (
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
  );
}

export default UserDashboard;