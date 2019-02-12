const BaseService = require('./BaseService')
const Trips = require('../models/Trips')
const TripsEntity = require('../entities/TripsEntity')
const MissionsService = require('./MissionsService')

class TripsService extends BaseService {
  constructor() {
    super()
    this._model = Trips
    this._Entity = TripsEntity 
  }

  create(params) {
    const { missions } = params
    return Promise.all(missions.map(mission => MissionsService.create(mission)))
      .then((missionEntities) => {
        const enhanceParams = Object.assign(params, {
          missions: missionEntities.map(missionEntity => missionEntity.getOne().id)
        })
        return super.create(enhanceParams)
      })
  }
}

module.exports = new TripsService
