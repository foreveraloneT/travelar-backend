const { omit, isEmpty, cloneDeep } = require('lodash')

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

  // _createMyTrips(params) {
  //   return TripsService.getById(params.tripId)
  //     .then((tripEntity) => {
  //       const enhanceParams = Object.assign({
  //         userId: this.authUserId
  //       }, omit(tripEntity.data, ['status']), params)
    
  //       return super.create(enhanceParams)
  //     })
  // }

  _createMyTrips(params) {
    let returnEntity = null
    return TripsService.getById(params.tripId)
      .then((tripEntity) => {
        const enhanceParams = Object.assign({
          userId: this.authUserId
        }, omit(tripEntity.data, ['status']), params)
    
        return Promise.all([
          super.create(enhanceParams),
          MissionsService.setModelDocRef(tripEntity.docRef).getAll(),
        ])
      })
      .then(([entity, missionsCollection]) => {
        returnEntity = entity
        return Promise.all(missionsCollection.data.map(mission => {
          let myMission = {
            tripId: params.tripId,
            userId: this.authUserId,
            missionId: mission.id,
          }
          if (!isEmpty(mission.photo)) {
            myMission.photo = { status: 'not-started' }
          }
          if (!isEmpty(mission.checkIn)) {
            myMission.checkIn = { status: 'not-started' }
          }
          return MyMissionsService.create(myMission)
        }))
      })
      .then(() => returnEntity)
  }

  create(params) {
    return this.getOne(params)
      .then((entity) => {
        if (!isEmpty(entity.data)) {
          return entity
        }
        return this._createMyTrips(params)
      })
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
