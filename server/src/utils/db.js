const mongoose = require('mongoose');
const debug = require('debug')('ticketmango:server');
const errlog = require('debug')('ticketmango:error');

const db = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    debug('MongoDB is Connected...');
  } catch (err) {
    errlog(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
