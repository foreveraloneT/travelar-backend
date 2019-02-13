const BaseService = require('./BaseService')
const Missions = require('../models/Missions')
const MissionsEntity = require('../entities/MissionsEntity')
const MissionsCollection = require('../collections/MissionsCollection')

class MissionsService extends BaseService {
  constructor() {
    super()
    this._model = Missions
    this._Entity = MissionsEntity
    this._Collection = MissionsCollection
  }
}

module.exports = new MissionsService
