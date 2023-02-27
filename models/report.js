const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  checkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "checks"
  },
  status: {
    type: String,
  },
  availability: {
    type: Number,
  },
  outages: {
    type: Number,
  },
  downtime: {
    type: Number
  },
  uptime: {
    type: Number
  },
  responseTime: {
    type: Number
  },
  history: {
    type: [{createdAt: Date, status: String}]
  },
  responseTimeSum: {
    type: Number,
  }, 
  checkCount: {
    type: Number
  }



  
});

const report = mongoose.model('reports', reportSchema);

module.exports = report;
