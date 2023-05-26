import mongoose, { ConnectOptions } from 'mongoose';
import Debug from 'debug';

const debug = Debug('ticketmango:api');
const errlog = Debug('ticketmango:error');

// Get the URI from the environment
const db = process.env.MONGODB_URI;

const connectDB = async () => {
  if (typeof db !== 'undefined') {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(db, {
        useNewUrlParser: true,
      } as ConnectOptions);

      debug('MongoDB is Connected...');
    } catch (e) {
      let message = '';
      if (typeof e === 'string') {
        message = e.toUpperCase(); // works, `e` narrowed to string
      } else if (e instanceof Error) {
        message = e.message;
      }
      errlog(message);
      process.exit(1);
    }
  } else {
    errlog('MongoDB URI is undefined');
    process.exit(1);
  }
};

export default connectDB;
