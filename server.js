// server.js

const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./db'),
  authRoute = require('./routes/auth.route')

const app = express()
app.use(cors())
const coachesRoute = require('./routes/coaches.route')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://root:!s4froot@s4f-fslk8.mongodb.net/S4F', { useNewUrlParser: true }).then(
  () => {
    console.log('Database is connected')
  },
  err => {
    console.log('Can not connect to the database' + err)
  }
)


app.use(bodyParser.json())
let User = require('./models/users');

app.post("/login", (req,res) => {
    // checker si l'user et password exist dans la base de donnees
//     User.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
//         // si l'user avec le mot de passe exist 
//         if(user) {
//             // envoyer une response avec status et email
//             res.json({status: "loged", data: req.body.email})
//             // ca c'est pour nous
//             console.log("V :", user.email, " : is loged in");
//         }
//         else {
//             // sinon envoyer une response avec l'erreur
//             res.json({status: "error", data: req.body.email})
//             // et autre fois ca c'est pour nous
//             console.log(`X : tentative de se connecter avec ${req.body.email} et ${req.body.password}`)
//         }
//     });
  console.log(req.body);
});

app.use('/users', authRoute)
app.use('/coaches', coachesRoute)

app.get("/", (req, res) => {

  res.send("hello!")
})

const port = process.env.PORT || 4000

const server = app.listen(port, function() {
  console.log('Listening on port ' + port)
})
