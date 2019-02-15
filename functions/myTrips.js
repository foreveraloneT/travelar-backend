const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const MyTripsService = require('./services/MyTripsService')
const MyMissionsService = require('./services/MyMissionsService')
const autoSlash = require('./utils/autoSlash')
const admin = require('./firebase/admin')

const tripsCollectionRef = admin.firestore().collection('trips')

const app = express()
app.use(cors({ origin: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', (req, res) => 
  MyTripsService
    .setAuthUser(req.get('X-User'))
    .create(req.body)
    .then(result => result.response())
    .then(response => res.send(response))
)

// my mission

// app.get('/:tripId/missions/all', (req, res) =>
//   MissionsService.setModelDocRef(tripsCollectionRef.doc(req.params.tripId))
//     .getAll()
//     .then(result => result.response())
//     .then(response => res.send(response))
// )

// app.get('/:tripId/missions/:id', (req, res) =>
//   MissionsService.setModelDocRef(tripsCollectionRef.doc(req.params.tripId))
//     .getById(req.params.id)
//     .then(result => result.response())
//     .then(response => res.send(response))
// )

module.exports = functions.https.onRequest(autoSlash(app))
