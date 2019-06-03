// session.route.js
const express = require('express')
const app = express()
const sessionRoutes = express.Router()
const uuid = require('uuid')

// Require Session model
let Session = require('../models/session')
let token = uuid.v4()

// Insertion en bdd
sessionRoutes.post('/add', (req, res) => {
  console.log(req.body.date)

  Session.findOne({ date: req.body.date }, (err, ses) => {
    if (ses) {
      res
        .status(400)
        .json({ status: 'session add company error', date: req.body })
    } else {
      let session = new Session({
        date: req.body.date,
        duration: req.body.duration,
        timeSession: req.body.timeSession,
        minParticipant: req.body.minParticipant,
        maxParticipant: req.body.maxParticipant,
        company: req.body.company,
        coach: req.body.coach,
        sport: req.body.sport,
      })

      console.log(req.body)
      session.save((err, session) => {
        if (session) {
          res.status(200).json({ status: 'session saved', data: req.body })
        }
        if (err) {
          res.status(400).json({ status: 'session add error', data: req.body })
        }
      })
    }
  })
})

// récupération des sessions de la bdd
sessionRoutes.get('/', (req, res) => {
  Session.find(function(err, sessions) {
    if (err) {
      console.log(err)
    } else {
      res.json(sessions)
    }
  })
})

// détail d'une entreprise
sessionRoutes.get('/detail/:id', (req, res) => {
  Session.find({ _id: req.params.id }, (err, session) => {
    if (err) {
      console.log(err)
    } else {
      res.json(session)
    }
  })
})

// Suppression d'une séance
sessionRoutes.post('/delete', (req, res) => {
  Session.find({ _id: req.body.id }, (err, session) => {
    if (session) {
      Session.findOneAndDelete({ _id: req.body.id }, (err, r) => {
        if (res) {
          console.log('session delete : ', req.body.id)
          res.status(200).json({ status: 'session delete', data: req.body.id })
        } else {
          console.log('session: ', req.body.id, 'est introuvable')
          res
            .status(404)
            .json({ status: 'session not found', data: req.body.id })
        }
      })
    } else {
      console.log('session: ', req.body.id, 'est introuvable')
      res.status(404).json({ status: 'session not found', data: req.body.id })
    }
  })
})

// Récupérer la séance que l'on veut modifier et l'editer
sessionRoutes.route('/edit/:id').get(function(req, res) {
  Session.find({ _id: req.params.id }, (err, coach) => {
    if (err) {
      console.log(err)
    } else {
      res.json(coach)
    }
  })
})

//  Soumettre la modification de la séance et l'enregistrer en BDD

sessionRoutes.post('/update/:id', (req, res) => {
  console.log(req.body.email)

  Session.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        date: req.body.date,
        duration: req.body.duration,
        timeSession: req.body.timeSession,
        minParticipant: req.body.minParticipant,
        maxParticipant: req.body.maxParticipant,
        company: req.body.company,
        coach: req.body.coach,
        sport: req.body.sport,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Doesn't work")
      }
      console.log(doc)
      res.status(200).json({ status: 'session updated', data: req.body.id })
    }
  )
  console.log(req.body)
  console.log(req.params.id)
})

module.exports = sessionRoutes
