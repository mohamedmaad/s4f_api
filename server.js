// server.js

const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./db'),
  authRoute = require('./routes/auth.route')

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
app.use(cors())
app.use(bodyParser.json())
app.use('/users', authRoute)
app.use('/coaches', coachesRoute)

app.get("/", (req, res) => {

  res.send("hello!")
})

const port = process.env.PORT || 4000

const server = app.listen(port, function() {
  console.log('Listening on port ' + port)
})
