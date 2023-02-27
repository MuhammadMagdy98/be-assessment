const mongoose = require('mongoose');

const checkSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  protocol: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  interval: {
    type: Number
  }
  
});

const check = mongoose.model('checks', checkSchema);

module.exports = check;
