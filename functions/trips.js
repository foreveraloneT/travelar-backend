const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const TripsService = require('./services/TripsService')
const autoSlash = require('./utils/autoSlash')

const app = express()
app.use(cors({ origin: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', (req, res) =>
  TripsService.create(req.body)
    .then(result => result.response())
    .then(response => res.send(response))
)

app.put('/:id/publish', (req, res) => 
  TripsService.publish(req.params.id)
    .then(result => result.response())
    .then(response => res.send(response))
)

app.get('/', (req, res) =>
  TripsService.get(req.query)
    .then(result => result.response())
    .then(response => res.send(response))
)

app.get('/all', (req, res) =>
  TripsService.getAll()
    .then(result => result.response())
    .then(response => res.send(response))
)

app.get('/:id', (req, res) =>
  TripsService.getById(req.params.id)
    .then(result => result.response())
    .then(response => res.send(response))
)


module.exports = functions.https.onRequest(autoSlash(app))
