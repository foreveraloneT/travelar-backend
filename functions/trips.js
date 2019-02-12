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

app.post('/', (req, res) => TripsService.create(req.body).then(entity => res.send(entity.response())))

module.exports = functions.https.onRequest(autoSlash(app))
