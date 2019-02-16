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

  getById(id) {
    return super.getById(id)
      .then(entity => entity.setAuthUser(this.authUserId))
  }

  getAll() {
    return super.getAll()
      .then(collection => collection.setAuthUser(this.authUserId))
  }
}

module.exports = new MissionsService
