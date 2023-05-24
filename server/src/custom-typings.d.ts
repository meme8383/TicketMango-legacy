import { IUser } from './models/user';

// Extend request object with user property
declare module 'express' {
  interface Request {
    user?: IUser;
  }
}
