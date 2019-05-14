// company.js

const mongoose = require('mongoose')

let Company = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    employees: {
      type: Number,
    },
    activity: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    tel: {
      type: String,
    },
  },
  {
    collection: 'companies',
  }
)
module.exports = mongoose.model('Company', Company)
