// coaches.route.js

const express = require('express')
const app = express()
const coachesRoutes = express.Router()
const uuid = require('uuid')

// Require Coaches model in our routes module
let Coaches = require('../models/coaches')
let token = uuid.v4()

// Defined store route
coachesRoutes.post('/add', (req, res) => {
  console.log(req.body.email)

  Coaches.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.status(400).json({ status: 'coach add email error', data: req.body })
    } else {
      let coaches = new Coaches({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.dateOfBirth,
        civility: req.body.civility,
        speciality: req.body.speciality,
        company: 'street4fit',
        email: req.body.email,
        tel: req.body.tel,
        pictures: 'http://placehold.it/32x32',
        password: uuid.v4(),
      })

      console.log(req.body)
      coaches.save((err, coach) => {
        if (coach) {
          res.status(200).json({ status: 'coach saved', data: req.body })
        }
        if (err) {
          res.status(400).json({ status: 'coach add error', data: req.body })
        }
      })
    }
  })
})

// Defined get data(index or listing) route
coachesRoutes.route('/').get(function(req, res) {
  Coaches.find(function(err, coacheses) {
    if (err) {
      console.log(err)
    } else {
      res.json(coacheses)
    }
  })
})

coachesRoutes.route('/detail/:id').get(function(req, res) {
  Coaches.find({ _id: req.params.id }, (err, coach) => {
    if (err) {
      console.log(err)
    } else {
      res.json(coach)
    }
  })
})

coachesRoutes.post('/delete', (req, res) => {
  Coaches.find({ _id: req.body.id }, (err, coach) => {
    if (coach) {
      Coaches.findOneAndDelete({ _id: req.body.id }, (err, r) => {
        if (res) {
          console.log('coach delete : ', req.body.id)
          res.status(200).json({ status: 'coach deleted', data: req.body.id })
        } else {
          console.log('coach : ', req.body.id, ' est introuvable')
          res.status(404).json({ status: 'coach not found', data: req.body.id })
        }
      })
    } else {
      console.log('coach : ', req.body.id, ' est introuvable')
      res.status(404).json({ status: 'coach not found', data: req.body.id })
    }
  })
})
// Defined AddCoach route

// // Defined edit route
// coachesRoutes.route('/edit/:id').get(function(req, res) {
//   let id = req.params.id
//   Coaches.findById(id, function(err, coaches) {
//     res.json(coaches)
//   })
// })

// //  Defined update route
// coachesRoutes.route('/update/:id').post(function(req, res) {
//   Coaches.findById(req.params.id, function(err, next, coaches) {
//     if (!coaches) return next(new Error('Could not load Document'))
//     else {
//       coaches.coach_firstname = req.body.coach_firstname
//       coaches.coach_name = req.body.coach_name

//       coaches
//         .save()
//         .then(coaches => {
//           res.json('Update complete')
//         })
//         .catch(err => {
//           res.status(400).send('unable to update the database')
//         })
//     }
//   })
// })

// // Defined delete | remove | destroy route
// coachesRoutes.route('/delete/:id').get(function(req, res) {
//   Coaches.findByIdAndRemove({ _id: req.params.id }, function(err, coaches) {
//     if (err) res.json(err)
//     else res.json('Successfully removed')
//   })
// })

module.exports = coachesRoutes
