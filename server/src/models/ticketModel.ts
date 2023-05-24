import mongoose, { Schema } from 'mongoose';

const ticketSchema = new Schema(
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
    user_id: {
      type: String,
    },
    event_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Ticket', ticketSchema);
