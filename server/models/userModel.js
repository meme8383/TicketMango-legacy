const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

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
})

// static signup method
userSchema.statics.signup = async function (email, password, firstName, lastName) {

  // validation
  if (!email || !password || !firstName || !lastName) {
    throw Error('EMPTY_FIELD')
  }
  if (!validator.isEmail(email)) {
    throw Error('INVALID_EMAIL')
  }
  if (!validator.isStrongPassword(password, {minSymbols: 0})) {
    throw Error('WEAK_PASSWORD')
  }

  const exists = await this.findOne({email})

  if (exists) {
    throw Error('EMAIL_INUSE')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return await this.create({email, password: hash, firstName, lastName})
}

// static login method
userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw Error('EMPTY_FIELD')
  }

  const user = await this.findOne({email})
  if (!user) {
    throw Error('EMAIL_NOTFOUND')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('INCORRECT_PASSWORD')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)