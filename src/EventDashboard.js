import React, { useEffect, useState } from 'react';

function EventDashboard() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole || 'user');
  }, []);

  const addEvent = () => console.log('Add Event');
  const updateEvent = () => console.log('Update Event');
  const removeEvent = () => console.log('Remove Event');
  const searchEvent = () => console.log('Search Event');
//   const addEvent = () => {
//     console.log('Add event triggered');
 
//   };

//   const updateEvent = () => {
//     console.log('Update event triggered');

//   };

//   const removeEvent = () => {
//     console.log('Remove event triggered');

//   };

//   const searchEvent = () => {
//     console.log('Search event triggered');

//   };

  return (
    <div>
      <h1>Event Dashboard</h1>

      {role === 'admin' && (
        <>
          <button onClick={addEvent}>Add Event</button>
          <button onClick={updateEvent}>Update Event</button>
          <button onClick={removeEvent}>Remove Event</button>
        </>
      )}

      <button onClick={searchEvent}>Search Event</button>
    </div>
  );
}

export default EventDashboard;
