const { omit, get } = require('lodash')

const BaseService = require('./BaseService')
const Trips = require('../models/Trips')
const TripsEntity = require('../entities/TripsEntity')
const TripsCollection = require('../collections/TripsCollection')
const MissionsService = require('./MissionsService')

const STATUS = {
  PUBLISHED: 'published'
}
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
    const missionsCount = missions.length
    const totalPoint = missions.reduce((sum, mission) => {
      const checkInPoint = get(mission, 'checkIn.point', 0)
      const photoPoint = get(mission, 'photo.point', 0)
      return sum + checkInPoint + photoPoint
    }, 0)
    return super.create(Object.assign({ missionsCount, totalPoint }, selectedParams))
      .then((tripsEntity) => {
        tripRef = tripsEntity.docRef
        MissionsService.setModelDocRef(tripRef)
        return Promise.all(missions.map((mission, order) =>
          MissionsService.create(Object.assign({ order }, mission)))
        )
      })
      .then(() => this.getById(tripRef.id))
  }

  get(params) {
    if (params.isFeature) {
      params.isFeature = params.isFeature === 'true'
    }
    return super.get(params)
  }

  getById(id) {
    return super.getById(id)
      .then(entity => entity.setAuthUser(this.authUserId))
  }

  publish(id) {
    return this.updateById(id, { status: 'published' })
  }

  setFeature(id) {
    return this.updateById(id, { isFeature: true })
  }

  unsetFeature(id) {
    return this.updateById(id, { isFeature: false })
  }
}

module.exports = new TripsService
