const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const connectDB = require('./utils/db')

const eventRouter = require('./routes/events')
const userRouter = require('./routes/user')

const app = express()
connectDB()
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/events', eventRouter)

app.use('/api/user', userRouter)

module.exports = app
