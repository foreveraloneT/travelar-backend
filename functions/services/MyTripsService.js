const { omit } = require('lodash')

const BaseService = require('./BaseService')
const MyTrips = require('../models/MyTrips')
const MytripsEntity = require('../entities/MyTripsEntity')
const MyTripsCollection = require('../collections/MyTripsCollection')
const TripsService = require('./TripsService')
const MissionsService = require('./MissionsService')
const MyMissionsService = require('./MyMissionsService')

class MyTripsService extends BaseService {
  constructor() {
    super()
    this._model = MyTrips
    this._Entity = MytripsEntity
    this._Collection = MyTripsCollection
  }

  create(params) {
    return TripsService.getById(params.tripId)
      .then((tripEntity) => {
        const enhanceParams = Object.assign({
          userId: this.authUerId
        }, omit(tripEntity.data, ['status']), params)
    
        return super.create(enhanceParams)
      })
  }

  get(params) {
    const enhanceParams = Object.assign({
      userId: this.authUerId
    }, params)

    return super.get(enhanceParams)
  }
}

module.exports = new MyTripsService
