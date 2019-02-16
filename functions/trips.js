const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const TripsService = require('./services/TripsService')
const MissionsService = require('./services/MissionsService')
const autoSlash = require('./utils/autoSlash')
const admin = require('./firebase/admin')

const tripsCollectionRef = admin.firestore().collection('trips')

const app = express()
app.use(cors({ origin: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', (req, res) =>
  TripsService.create(req.body)
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
  TripsService.setAuthUser(req.get('X-User'))
    .getById(req.params.id)
    .then(result => result.response())
    .then(response => res.send(response))
)

app.put('/:id/publish', (req, res) => 
  TripsService.publish(req.params.id)
    .then(result => result.response())
    .then(response => res.send(response))
)

app.put('/:id/set-feature', (req, res) => 
  TripsService.setFeature(req.params.id)
    .then(result => result.response())
    .then(response => res.send(response))
)

app.put('/:id/unset-feature', (req, res) => 
  TripsService.unsetFeature(req.params.id)
    .then(result => result.response())
    .then(response => res.send(response))
)

// mission

app.get('/:tripId/missions/all', (req, res) =>
  MissionsService.setModelDocRef(tripsCollectionRef.doc(req.params.tripId))
    .getAll()
    .then(result => result.response())
    .then(response => res.send(response))
)

app.get('/:tripId/missions/:id', (req, res) =>
  MissionsService.setModelDocRef(tripsCollectionRef.doc(req.params.tripId))
    .setAuthUser(req.get('X-User'))
    .getById(req.params.id)
    .then(result => result.response())
    .then(response => res.send(response))
)

module.exports = functions.https.onRequest(autoSlash(app))
