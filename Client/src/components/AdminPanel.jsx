import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminpanel.css'

function EventList() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    description: '',
    price:'',
  });


  const fetchEvents = () => {
    axios.get('http://localhost:8000/events')
      .then((response) => {
        setEvents(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  const addEvent = () => {
    axios.post('http://localhost:8000/events', newEvent)
      .then(() => {
        fetchEvents();
        setNewEvent({ name: '', date: '', description: '', price:'', });
      })
      .catch((error) => {
        console.error('Error adding an event:', error);
      });
  };

  const deleteEvent = (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    
    if (confirmDelete) {
      axios.delete(`http://localhost:8000/events/${eventId}`)
        .then(() => {
          fetchEvents();
        })
        .catch((error) => {
          console.error('Error deleting an event:', error);
        });
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
 



  return (
    <div>
      <h2>Event List For Admins</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Description: {event.description}</p>
            <p>Price: {event.price}</p>
            <button onClick={() => deleteEvent(event._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add New Event</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={newEvent.name}
        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
      />
      <input
        type="date"
        value={newEvent.date}
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
      />
      <textarea
        placeholder="Event Description"
        value={newEvent.description}
        onChange={(e) =>
          setNewEvent({ ...newEvent, description: e.target.value })
        }
      />
       
      <input
        placeholder="price"
        value={newEvent.price}
        onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
      />
      <button onClick={addEvent}>Add Event</button>
    </div>
  );
}

export default EventList;
