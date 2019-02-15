const BaseService = require('./BaseService')
const MyMissions = require('../models/MyMissions')
const MyMissionsEntity = require('../entities/MyMissionsEntity')
const MyMissionsCollection = require('../collections/MyMissionsCollection')

class MyMissionsService extends BaseService {
  constructor() {
    super()
    this._model = MyMissions
    this._Entity = MyMissionsEntity
    this._Collection = MyMissionsCollection
  }
}

module.exports = new MyMissionsService
