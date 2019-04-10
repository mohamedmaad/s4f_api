// coaches.route.js

const express = require('express')
const app = express()
const coachesRoutes = express.Router()
const uuid = require('uuid')

// Require Coaches model in our routes module
let Coaches = require('../models/coaches')
let token = uuid.v4()

// Defined store route
coachesRoutes.route('/add').post(function(req, res) {
  let coaches = new Coaches(req.body)
  coaches
    .save()
    .then(coaches => {
      res.status(200).json({ coaches: 'business in added successfully' })
    })
    .catch(err => {
      res.status(400).send('unable to save to database')
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
// Defined edit route
coachesRoutes.route('/edit/:id').get(function(req, res) {
  let id = req.params.id
  Coaches.findById(id, function(err, coaches) {
    res.json(coaches)
  })
})

//  Defined update route
coachesRoutes.route('/update/:id').post(function(req, res) {
  Coaches.findById(req.params.id, function(err, next, coaches) {
    if (!coaches) return next(new Error('Could not load Document'))
    else {
      coaches.person_name = req.body.person_name
      coaches.coaches_name = req.body.coaches_name
      coaches.coaches_gst_number = req.body.coaches_gst_number

      coaches
        .save()
        .then(coaches => {
          res.json('Update complete')
        })
        .catch(err => {
          res.status(400).send('unable to update the database')
        })
    }
  })
})

// Defined delete | remove | destroy route
coachesRoutes.route('/delete/:id').get(function(req, res) {
  Coaches.findByIdAndRemove({ _id: req.params.id }, function(err, coaches) {
    if (err) res.json(err)
    else res.json('Successfully removed')
  })
})

module.exports = coachesRoutes
