import express from 'express';
import {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
  createTicket,
  getTicket,
  getTickets,
  updateTicket,
  deleteTicket,
} from '../controllers/eventController';
import requireAuth from '../middleware/requireAuth';

const router = express.Router();

// GET a single event
router.get('/:id', getEvent);

// CREATE a ticket
router.post('/:id/tickets/new', createTicket);

// GET a single ticket
router.get('/:id/tickets/:ticketId', getTicket);

// Middleware
router.use(requireAuth);

// UPDATE a ticket
router.patch('/:id/tickets/:ticketId', updateTicket);

// DELETE a ticket
router.delete('/:id/tickets/:ticketId', deleteTicket);

// GET all events
router.get('/', getEvents);

// Get all tickets
router.get('/:id/tickets', getTickets);

// POST a new event
router.post('/', createEvent);

// DELETE an event
router.delete('/:id', deleteEvent);

// UPDATE an event
router.patch('/:id', updateEvent);

export default router;
