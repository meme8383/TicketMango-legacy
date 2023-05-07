const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  maxParticipants: {
    type: Number
  }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)