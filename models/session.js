// Session.js

const mongoose = require('mongoose')

let Session = new mongoose.Schema(
  {
    coach: {
      type: String,
    },
    company: {
      type: String,
    },
    date: {
      type: Date,
    },
    maxParticipant: {
      type: Number,
    },
    minParticipant: {
      type: Number,
    },
    timeSession: {
      type: String,
    },
    duration: {
      type: String,
    },
    sport: {
      type: String,
    },
  },
  {
    collection: 'sessions',
  }
)

module.exports = mongoose.model('Session', Session)
