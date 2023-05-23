const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
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
  email,
  password,
  firstName,
  lastName,
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
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('EMAIL_INUSE');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
  });
  return user;
};

// Static login method
userSchema.statics.login = async function login(email, password) {
  // Validation
  if (!email || !password) {
    throw Error('EMPTY_FIELD');
  }

  // Check if email exists
  const user = await this.findOne({ email });
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

module.exports = mongoose.model('User', userSchema);
