const Event = require('../models/eventModel')
const mongoose = require('mongoose')

// get all events
const getEvents = async (req, res) => {
  const user_id = req.user._id

  const events = await Event.find({user_id}).sort({createdAt: -1})

  res.status(200).json(events)
}

// get a single event
const getEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such event'})
  }

  const event = await Event.findById(id)

  if (!event) {
    return res.status(404).json({error: 'No such event'})
  }

  res.status(200).json(event)
}


// create new event
const createEvent = async (req, res) => {
  const {title, date, location, description, maxParticipants} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!date) {
    emptyFields.push('date')
  }
  if(!location) {
    emptyFields.push('location')
  }
  if(!description) {
    emptyFields.push('description')
  }
  if(!maxParticipants) {
    emptyFields.push('maxParticipants')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const event = await Event.create({title, date, location, description, maxParticipants, user_id})
    res.status(200).json(event)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a event
const deleteEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such event'})
  }

  const event = await Event.findOneAndDelete({_id: id})

  if (!event) {
    return res.status(400).json({error: 'No such event'})
  }

  res.status(200).json(event)
}

// update a event
const updateEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such event'})
  }

  const event = await Event.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!event) {
    return res.status(400).json({error: 'No such event'})
  }

  res.status(200).json(event)
}


module.exports = {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent
}