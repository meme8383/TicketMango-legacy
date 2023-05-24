import { IUser } from '../models/userModel';

// Extend request object with user property
declare module 'express' {
  interface Request {
    user?: IUser;
  }
}
