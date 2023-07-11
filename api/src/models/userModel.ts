import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Create user interface
export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserModel extends mongoose.Model<IUser> {
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<IUser>;
  login: (email: string, password: string) => Promise<IUser>;
}

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static signup method
userSchema.statics.signup = async function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  // Validation
  if (!email || !password || !firstName || !lastName) {
    throw Error('EMPTY_FIELD');
  }
  if (!validator.isEmail(email)) {
    throw Error('INVALID_EMAIL');
  }
  if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
    throw Error('WEAK_PASSWORD');
  }

  // Check if email exists
  const exists = await this.findOne({ email: email.toLowerCase() });

  if (exists) {
    throw Error('EMAIL_INUSE');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return this.create({
    email: email.toLowerCase(),
    password: hash,
    firstName,
    lastName,
  });
};

// Static login method
userSchema.statics.login = async function login(email: string, password: string) {
  // Validation
  if (!email || !password) {
    throw Error('EMPTY_FIELD');
  }

  // Check if email exists
  const user = await this.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw Error('EMAIL_NOTFOUND');
  }

  // Check if password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('INCORRECT_PASSWORD');
  }

  return user;
};

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
