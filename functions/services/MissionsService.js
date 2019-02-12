const BaseService = require('./BaseService')
const Missions = require('../models/Missions')
const MissionsEntity = require('../entities/MissionsEntity')

class MissionsService extends BaseService {
  constructor() {
    super()
    this._model = Missions
    this._Entity = MissionsEntity 
  }
}

module.exports = new MissionsService
