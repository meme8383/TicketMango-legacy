import express from 'express';
import { getEvents, getEvent, createEvent, deleteEvent, updateEvent } from '../controllers/eventController';
import requireAuth from '../middleware/requireAuth';

const router = express.Router();

// Middleware
router.use(requireAuth);

// GET all events
router.get('/', getEvents);

// GET a single event
router.get('/:id', getEvent);

// POST a new event
router.post('/', createEvent);

// DELETE an event
router.delete('/:id', deleteEvent);

// UPDATE an event
router.patch('/:id', updateEvent);

export default router;
