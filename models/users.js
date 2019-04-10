const mongoose = require('mongoose')

let Users = new mongoose.Schema(
    {
        firstName: {
          type: String
        },
        lastName: {
          type: String
        },
        email: {
            type: String,
            unique: true
        },
        tel: {
            type: String
        },
        password: {
            type: String
        },
        civility: {
            type: String
        },
        birthday: {
            type: Date
        },
        adress: {
            type: String
        },
        type: {
            type: String,
            enum: ["admin", "user", "company"]
        },
        token: {
            type: String
        }
    },
    {
      collection: 'users',
    }
)

module.exports = mongoose.model('Users', Users)
