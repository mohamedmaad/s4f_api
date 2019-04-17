// server.js

const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./db'),
  authRoute = require('./routes/auth.route')
companyRoute = require('./routes/company.route')

const coachesRoute = require('./routes/coaches.route')
mongoose.Promise = global.Promise
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log('Database is connected')
  },
  err => {
    console.log('Can not connect to the database' + err)
  }
)

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/users', authRoute)
app.use('/coaches', coachesRoute)
app.use('/company', companyRoute)
const port = process.env.PORT || 4000

const server = app.listen(port, function() {
  console.log('Listening on port ' + port)
})
