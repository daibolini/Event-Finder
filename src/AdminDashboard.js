import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const [newEvent, setNewEvent] = useState({ eventName: '', location: '', date: '', genre: '', venue: '', ticketLink: '' });
  const [editEvent, setEditEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('/EventFinderRESTProject/rest/events')
      .then(response => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events', error);
      });
  };

  const handleSearch = () => {
    const results = events.filter(event =>
      (location ? event.location.toLowerCase().includes(location.toLowerCase()) : true) &&
      (date ? new Date(event.date).toDateString() === new Date(date).toDateString() : true) &&
      (genre ? event.genre.toLowerCase().includes(genre.toLowerCase()) : true)
    );
    setFilteredEvents(results);
  };

  const handleAddEvent = () => {
    axios.post('/EventFinderRESTProject/rest/events/addEvent', newEvent)
      .then(() => {
        fetchEvents();
        setNewEvent({ eventName: '', location: '', date: '', genre: '', venue: '', ticketLink: '' });
        alert("Event added successfully!");
      })
      .catch(error => {
        console.error('Error adding event', error);
      });
  };

   const handleUpdateEvent = () => {
    if (editEvent) {
        axios.put(`/EventFinderRESTProject/rest/events/updateEvent`, editEvent)
           .then(() => {
            fetchEvents(); //refresh the event list
            setEditEvent(null);
            alert("Event updated successfully!");
           })
           .catch(error => {
            console.error('Error updating event', error);
           });
        }
    };

    const openEditModal = (event) => {
        setEditEvent(event);
        setIsEditModalOpen(true);
    };
    
      const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditEvent(null);
    };

    // useEffect(() => {
    //     setFilteredEvents(events);
    // }, [events]);

  const openDeleteModal = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const handleRemoveEvent = () => {
    if (eventToDelete) {
      axios.delete(`/EventFinderRESTProject/rest/events/removeEvent?eventName=${eventToDelete.eventName}`)
        .then(() => {
          fetchEvents();
          closeDeleteModal();
          alert("Event deleted successfully");
        })
        .catch(error => {
          console.error('Error removing event', error);
        });
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <nav className="navbar">
        <div className="search-section">
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="event-options">
          <h3>Add New Event</h3>
          <input type="text" placeholder="Event Name" value={newEvent.eventName} onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })} />
          <input type="text" placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
          <input type="datetime-local" placeholder="Date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          <input type="text" placeholder="Genre" value={newEvent.genre} onChange={(e) => setNewEvent({ ...newEvent, genre: e.target.value })} />
          <input type="text" placeholder="Venue" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} />
          <input type="text" placeholder="Ticket Link" value={newEvent.ticketLink} onChange={(e) => setNewEvent({ ...newEvent, ticketLink: e.target.value })} />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      </nav>

      {/*display Events */}
      <div className="events-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <h2>{event.eventName}</h2>
              <p>Location: {event.location}</p>
              <p>Date: {event.date}</p>
              <p>Genre: {event.genre}</p>
              <p>Venue: {event.venue}</p>
              <a href={event.ticketLink}>Buy Tickets</a>
              <button onClick={() => openEditModal(event)}>Edit</button>
              <button onClick={() => openDeleteModal(event)}>Delete</button>
              {/* <button onClick={() => handleRemoveEvent(event.eventName)}>Delete</button> */}
            </div>
          ))
        ) : (
          <p>No events found with the chosen criteria.</p>
        )}
      </div>

      {isEditModalOpen && editEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
          <h3>Edit Event</h3>
          {editEvent && (
                <>
                    <input type="text" placeholder="Event Name" value={editEvent.eventName || ''} onChange={(e) => setEditEvent({ ...editEvent, eventName: e.target.value })} />
                    <input type="text" placeholder="Location" value={editEvent.location || ''} onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })} />
                    <input type="datetime-local" placeholder="Date" value={editEvent.date || ''} onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })} />
                    <input type="text" placeholder="Genre" value={editEvent.genre || ''} onChange={(e) => setEditEvent({ ...editEvent, genre: e.target.value })} />
                    <input type="text" placeholder="Venue" value={editEvent.venue || ''} onChange={(e) => setEditEvent({ ...editEvent, venue: e.target.value })} />
                    <input type="text" placeholder="Ticket Link" value={editEvent.ticketLink || ''} onChange={(e) => setEditEvent({ ...editEvent, ticketLink: e.target.value })} />
                </>
            )}
          <button onClick={handleUpdateEvent}>Update Event</button>
          <button onClick={closeEditModal}>Cancel</button> 
        </div>
       </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Event</h3>
            <p>Are you sure you want to delete this event?</p>
            <button onClick={handleRemoveEvent}>Yes</button>
            <button onClick={closeDeleteModal}>No</button>
        </div>
       </div>
      )}

    </div>
  );
}

export default AdminDashboard;
