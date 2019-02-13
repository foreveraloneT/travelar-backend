const { omit } = require('lodash')

const BaseService = require('./BaseService')
const Trips = require('../models/Trips')
const TripsEntity = require('../entities/TripsEntity')
const TripsCollection = require('../collections/TripsCollection')
const MissionsService = require('./MissionsService')

class TripsService extends BaseService {
  constructor() {
    super()
    this._model = Trips
    this._Entity = TripsEntity
    this._Collection = TripsCollection
  }

  create(params) {
    const selectedParams = omit(params, ['missions'])
    const { missions } = params
    let tripRef = null
    return super.create(Object.assign({ missionsCount: missions.length }, selectedParams))
      .then((tripsEntity) => {
        tripRef = tripsEntity.docRef
        MissionsService.setModelDocRef(tripRef)
        return Promise.all(missions.map(mission =>
          MissionsService.create(mission))
        )
      })
      .then(() => this.getById(tripRef.id))
  }
}

module.exports = new TripsService
