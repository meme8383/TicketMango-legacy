const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Database and routes
const connectDB = require('./utils/db');
const eventRouter = require('./routes/events');
const userRouter = require('./routes/user');

const app = express();

// Connect to database
connectDB()

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
app.use('/api/events', eventRouter);
app.use('/api/user', userRouter);

module.exports = app;
