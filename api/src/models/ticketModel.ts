import mongoose, { Schema } from 'mongoose';

const ticketSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    event_id: {
      type: String,
      required: true,
    },
    scannedAt: {
      type: Date,
    },
    info: {
      type: JSON,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Ticket', ticketSchema);
