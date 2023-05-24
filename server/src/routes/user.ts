import express from 'express';
import { loginUser, signupUser, deleteUser } from '../controllers/userController';
import RequireAuth from '../middleware/requireAuth';

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// Require auth for editing user
router.use(RequireAuth);

// Delete route
router.delete('/delete', deleteUser);

export default router;
