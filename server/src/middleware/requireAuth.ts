import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // Verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    // No authorization header
    res.status(401).json({ error: 'Authorization token required' });
    return;
  }

  // Get JWT from header
  const token = authorization.split(' ')[1];

  try {
    // Verify JWT and get user ID
    const { _id } = jwt.verify(token, process.env.SECRET as Secret) as JwtPayload;

    req.user = (await User.findOne({ _id }).select('_id')) as IUser;
    next();
  } catch (e) {
    // Invalid or expired JWT
    let message = '';
    if (typeof e === 'string') {
      message = e.toUpperCase(); // works, `e` narrowed to string
    } else if (e instanceof Error) {
      message = e.message;
    }
    res.status(401).json({ error: message });
  }
};

export default requireAuth;
