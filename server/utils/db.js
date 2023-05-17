const mongoose = require('mongoose');
const path = require("path");
const debug = require('debug')('ticketmango:server');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: path.resolve(__dirname, '../.env.local')})
}

const db = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    debug('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;