import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userpage.css'

function UserPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);

  const fetchEvents = () => {
    axios.get('http://localhost:8000/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  const bookTickets = () => {
    if (selectedEvent) {
      // Send a POST request to book tickets for the selected event
      // Use selectedEvent._id and ticketCount for booking
      // Handle success or error as needed
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container">
    <h2>Event List</h2>
    {events.map((event) => (
      <div key={event._id} className="event-card">
        <div>
          <h3>{event.name}</h3>
          <p>Date: {event.date}</p>
          <p>Description: {event.description}</p>
          <p>Price: {event.price}</p>
        </div>
        <button onClick={() => setSelectedEvent(event)}>Book Tickets</button>
      </div>
    ))}

    {selectedEvent && (
      <div className="selected-event">
        <img src={selectedEvent.image} alt="" />
        <h2>Book Tickets for {selectedEvent.name}</h2>
        <p>Date: {selectedEvent.date}</p>
        <p>Description: {selectedEvent.description}</p>
        <p>Price: {selectedEvent.price}</p>
        <input
          type="number"
          placeholder="Number of Tickets"
          value={ticketCount}
          onChange={(e) => setTicketCount(e.target.value)}
        />
        <button onClick={bookTickets}>Book</button>
      </div>
    )}
  </div>
  );
}

export default UserPage;
