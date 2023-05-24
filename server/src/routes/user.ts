import express from 'express';
import { loginUser, signupUser } from '../controllers/userController';

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

export default router;
