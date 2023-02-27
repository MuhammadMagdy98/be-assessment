const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Boolean
  },
  emailVerificationToken: {
    type: String,
  }
});

const user = mongoose.model('users', userSchema);

module.exports = user;
