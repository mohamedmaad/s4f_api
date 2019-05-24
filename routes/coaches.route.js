// coaches.route.js

const express = require('express')
const app = express()
const coachesRoutes = express.Router()
const uuid = require('uuid')

// Require Coaches model in our routes module
let Coaches = require('../models/coaches')
let token = uuid.v4()

// Ajout d'un coach en bdd
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

// Récupérer la liste de coach
coachesRoutes.route('/').get(function(req, res) {
  Coaches.find(function(err, coacheses) {
    if (err) {
      console.log(err)
    } else {
      res.json(coacheses)
    }
  })
})

// Détail du coach
coachesRoutes.route('/detail/:id').get(function(req, res) {
  Coaches.find({ _id: req.params.id }, (err, coach) => {
    if (err) {
      console.log(err)
    } else {
      res.json(coach)
    }
  })
})

// Suppression d'un coach , en bdd
coachesRoutes.post('/delete', (req, res) => {
  Coaches.find({ _id: req.body.id }, (err, coach) => {
    if (coach) {
      Coaches.findOneAndDelete({ _id: req.body.id }, (err, c) => {
        if (c) {
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

// Récupérer le coach que l'on veut modifier et l'editer
coachesRoutes.route('/edit/:id').get(function(req, res) {
  Coaches.find({ _id: req.params.id }, (err, coach) => {
    if (err) {
      console.log(err)
    } else {
      res.json(coach)
    }
  })
})

//  Modifier coach

coachesRoutes.post('/edit/:id', (req, res) => {
  console.log(req.body.email)

  Coaches.find({ _id: req.body.id }, (err, coach) => {
    if (coach) {
      Coaches.findOneAndUpdate({ _id: req.body.id }, (err, r) => {
        if (res) {
          res.status(400).json({ status: 'can not modify', data: req.body })
        } else {
          let coaches = new Coaches({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.dateOfBirth,
            civility: req.body.civility,
            speciality: req.body.speciality,
            company: req.body.company,
            email: req.body.email,
            tel: req.body.tel,
          })
          console.log(req.body)
          coaches.save((err, coach) => {
            if (coach) {
              res.status(200).json({ status: 'coach updated', data: req.body })
            }
            if (err) {
              res
                .status(400)
                .json({ status: 'coach update error', data: req.body })
            }
          })
        }
      })
    } else {
      console.log('coach : ', req.body.id, " n'a pas été modifié")
      res.status(404).json({ status: 'coach not update', data: req.body.id })
    }
  })
})

module.exports = coachesRoutes
