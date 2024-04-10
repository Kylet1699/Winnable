const mongoose = require('mongoose');

// User schema
const SessionSchema = new mongoose.Schema({
  _id: String,
  expires: Date,
  session: Object,
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = { Session };
