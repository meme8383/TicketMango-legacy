import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Database and routes
import connectDB from './utils/db';
import eventRouter from './routes/events';
import userRouter from './routes/user';

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
app.use('/api/events', eventRouter);
app.use('/api/user', userRouter);

module.exports = app;
