const mongoose = require('mongoose');
const Event = require('../models/eventModel');

// Get all events
const getEvents = async (req, res) => {
  const user_id = req.user._id;

  // Sort events by created date (newest first)
  const events = await Event.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(events);
};

// Get a single event by id
const getEvent = async (req, res) => {
  const { id } = req.params;

  // Check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Invalid identifier' });
    return;
  }

  // Get event and check if it exists
  const event = await Event.findById(id);
  if (!event) {
    res.status(404).json({ error: 'Event does not exist' });
    return;
  }

  res.status(200).json(event);
};

// Create new event
const createEvent = async (req, res) => {
  const { title, date, location, description, maxParticipants } = req.body;

  if (!title || !date) {
    res.status(400).json({ error: 'Please fill in all required fields' });
    return;
  }

  // Add doc to db
  try {
    const user_id = req.user._id;
    const event = await Event.create({
      title,
      date,
      location,
      description,
      maxParticipants,
      user_id,
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Invalid identifier' });
    return;
  }

  const event = await Event.findOneAndDelete({ _id: id });

  if (!event) {
    res.status(400).json({ error: 'Event does not exist' });
    return;
  }

  res.status(200).json(event);
};

// Update an event
const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Invalid identifier' });
    return;
  }

  const event = await Event.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
  );

  if (!event) {
    res.status(400).json({ error: 'Event does not exist' });
    return;
  }

  res.status(200).json(event);
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
