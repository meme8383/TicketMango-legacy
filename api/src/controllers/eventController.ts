import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Event from '../models/eventModel';
import Ticket from '../models/ticketModel';

// Get all events
export const getEvents = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const user_id = req.user._id;

  // Sort events by created date (newest first)
  const events = await Event.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(events);
};

// Get a single event by id
export const getEvent = async (req: Request, res: Response) => {
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
export const createEvent = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

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
  } catch (e) {
    let message = '';
    if (typeof e === 'string') {
      message = e.toUpperCase(); // works, `e` narrowed to string
    } else if (e instanceof Error) {
      message = e.message;
    }
    res.status(400).json({ error: message });
  }
};

// Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
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
export const updateEvent = async (req: Request, res: Response) => {
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

// Create a ticket
export const createTicket = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Invalid identifier' });
    return;
  }

  const event = await Event.findById(id);
  if (!event) {
    res.status(404).json({ error: 'Event does not exist' });
    return;
  }

  const tickets = await Ticket.find({ event_id: id });
  if (event.maxParticipants && tickets.length >= event.maxParticipants) {
    res.status(400).json({ error: 'Event is full' });
    return;
  }

  const { info } = req.body;
  let user_id = null;
  if (req.user) {
    user_id = req.user._id;
  }

  try {
    const ticket = await Ticket.create({
      user_id,
      event_id: id,
      info,
    });
    res.status(200).json(ticket);
  } catch (e) {
    let message = '';
    if (typeof e === 'string') {
      message = e.toUpperCase();
    } else if (e instanceof Error) {
      message = e.message;
    }
    res.status(400).json({ error: message });
  }
};

// Get a single ticket
export const getTicket = async (req: Request, res: Response) => {
  const { id, ticketId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(ticketId)) {
    res.status(404).json({ error: 'Invalid identifier' });
    return;
  }

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    res.status(404).json({ error: 'Ticket does not exist' });
    return;
  }

  if (ticket.event_id !== id) {
    res.status(404).json({ error: 'Ticket does not exist' });
    return;
  }

  res.status(200).json(ticket);
};

// Get all tickets
export const getTickets = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Invalid identifier' });
    return;
  }

  const event = await Event.findById(id);
  if (!event) {
    res.status(404).json({ error: 'Event does not exist' });
    return;
  }

  const tickets = await Ticket.find({ event_id: id });

  res.status(200).json(tickets);
};

// Update a ticket
export const updateTicket = async (req: Request, res: Response) => {
  const { id, ticketId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(ticketId)) {
    res.status(404).json({ error: 'Invalid identifier' });
    return;
  }

  const ticket = await Ticket.findById(ticketId);
  if (!ticket || ticket.event_id !== id) {
    res.status(404).json({ error: 'Ticket does not exist' });
    return;
  }

  const updatedTicket = await Ticket.findOneAndUpdate(
    { _id: ticketId },
    {
      ...req.body,
    },
  );
  res.status(200).json(updatedTicket);
};

// Delete a ticket
export const deleteTicket = async (req: Request, res: Response) => {
  const { id, ticketId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(ticketId)) {
    res.status(404).json({ error: 'Invalid identifier' });
    return;
  }

  const ticket = await Ticket.findById(ticketId);
  if (!ticket || ticket.event_id !== id) {
    res.status(404).json({ error: 'Ticket does not exist' });
    return;
  }

  const deletedTicket = await Ticket.findOneAndDelete({ _id: ticketId });
  res.status(200).json(deletedTicket);
};
