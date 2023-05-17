const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    maxParticipants: {
      type: Number,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Event', eventSchema);
