const { omit, isEmpty } = require('lodash')

const BaseService = require('./BaseService')
const MyTrips = require('../models/MyTrips')
const MytripsEntity = require('../entities/MyTripsEntity')
const MyTripsCollection = require('../collections/MyTripsCollection')

class MyTripsService extends BaseService {
  constructor() {
    super()
    this._model = MyTrips
    this._Entity = MytripsEntity
    this._Collection = MyTripsCollection
  }

  get(params) {
    const enhanceParams = Object.assign({
      userId: this.authUserId
    }, params)

    return super.get(enhanceParams)
  }

  getOne(params) {
    const enhanceParams = Object.assign({
      userId: this.authUserId
    }, params)
    return super.getOne(enhanceParams)
  }
}

module.exports = new MyTripsService
