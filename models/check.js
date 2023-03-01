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
    type: String,
    enum: ['HTTP', 'HTTPS', 'TCP'],
    required: true,
  },
  path: {
    type: String,
  },
  port: {
    type: Number,
  },
  webhook: {
    type: String,
  },
  timeout: {
    type: Number,
    default: 5000,
  },
  interval: {
    type: Number,
    default: 600000,
  },
  threshold: {
    type: Number,
    default: 1,
  },
  authentication: {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  httpHeaders: {
    type: Object,
    default: {}
  },
  assert: {
    statusCode: {
      type: Number,
    },
  },
  tags: [{
    type: String,
  }],
  ignoreSSL: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  intervalId: {
    type: Number
  }
  
});

const check = mongoose.model('checks', checkSchema);

module.exports = check;
