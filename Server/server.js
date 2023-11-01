// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with the actual URL of your front end
  }));
  
// Connect to MongoDB (make sure MongoDB is installed and running)
mongoose.connect('mongodb://127.0.0.1:27017/eventdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  description: String,
  price:Number,
});

const Event = mongoose.model('Event', eventSchema);

app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

app.post('/events', async (req, res) => {
  const event = new Event({
    name: req.body.name,
    date: req.body.date,
    description: req.body.description,
    price:req.body.price,
  });

  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error adding the event' });
  }
});

app.delete('/events/:eventId', async (req, res) => {
  try {
    const removedEvent = await Event.findByIdAndRemove(req.params.eventId);
    if (removedEvent) {
      res.json({ message: 'Event deleted' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the event' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
