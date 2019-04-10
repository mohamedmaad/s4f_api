// coaches.js

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Coaches = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    civility: {
      type: String,
    },
    speciality: {
      type: String,
    },
    company: {
      type: String,
    },
    email: {
      type: String,
    },
    tel: {
      type: String,
    },
    pictures: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    collection: 'coaches',
  }
)

module.exports = mongoose.model('Coaches', Coaches)
