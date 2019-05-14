// company.route.js

const express = require('express')
const app = express()
const companyRoutes = express.Router()
const uuid = require('uuid')

// Require Coaches model in our routes module
let Company = require('../models/company')
let token = uuid.v4()

//Insertion en bdd
companyRoutes.post('/add', (req, res) => {
  console.log(req.body.email)

  Company.findOne({ email: req.body.email }, (err, company) => {
    if (company) {
      res
        .status(400)
        .json({ status: 'company add email error', data: req.body })
    } else {
      let company = new Company({
        name: req.body.name,
        activity: req.body.activity,
        employees: req.body.employees,
        address: req.body.address,
        email: req.body.email,
        tel: req.body.tel,
      })

      console.log(req.body)
      company.save((err, company) => {
        if (company) {
          res.status(200).json({ status: 'company saved', data: req.body })
        }
        if (err) {
          res.status(400).json({ status: 'company add error', data: req.body })
        }
      })
    }
  })
})

// récupération des entreprises de la bdd
companyRoutes.get('/', (req, res) => {
  Company.find(function(err, companies) {
    if (err) {
      console.log(err)
    } else {
      res.json(companies)
    }
  })
})

// détail d'une entreprise
companyRoutes.get('/detail/:id', (req, res) => {
  Company.find({ _id: req.params.id }, (err, company) => {
    if (err) {
      console.log(err)
    } else {
      res.json(company)
    }
  })
})

//Suppression d'une entreprise de la bdd
companyRoutes.post('/delete', (req, res) => {
  Company.find({ _id: req.body.id }, (err, company) => {
    if (company) {
      Company.findOneAndDelete({ _id: req.body.id }, (err, r) => {
        if (res) {
          console.log('company delete: ', req.body.id)
          res.status(200).json({ status: 'company deleted', data: req.body.id })
        }
      })
    } else {
      console.log('company: ', req.body.id, ' est introuvable')
      res.status(404).json({ status: 'company not found', data: req.body.id })
    }
  })
})

module.exports = companyRoutes
