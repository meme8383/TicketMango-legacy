import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET as string, { expiresIn: '3d' });
};

// login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (e) {
    let message = '';
    if (typeof e === 'string') {
      message = e.toUpperCase(); // works, `e` narrowed to string
    } else if (e instanceof Error) {
      message = e.message;
    }
    res.status(400).json({ error: message });
  }
};

// signup a user
export const signupUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await User.signup(email, password, firstName, lastName);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (e) {
    let message = '';
    if (typeof e === 'string') {
      message = e.toUpperCase(); // works, `e` narrowed to string
    } else if (e instanceof Error) {
      message = e.message;
    }
    res.status(400).json({ error: message });
  }
};
