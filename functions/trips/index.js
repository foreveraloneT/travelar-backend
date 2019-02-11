const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const Trips = require('./models/Trips')
const { data: dataView } = require('../views')
const autoSlash = require('../utils/autoSlash')

const app = express()
app.use(cors({ origin: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', (req, res) => Trips.create(req.body).then(data => res.send(dataView(data))))

module.exports = functions.https.onRequest(autoSlash(app))
