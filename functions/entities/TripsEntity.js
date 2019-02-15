const { isEmpty } = require('lodash')

const BaseEntity = require('./BaseEntity')
const MissionsService = require('../services/MissionsService')
const MyTripsService = require('../services/MyTripsService.temp')
const MyMissionsService = require('../services/MyMissionsService')

class TripsEntity extends BaseEntity {
  constructor(data) {
    super(data)
  }

  response() {
    if (isEmpty(this.data)) {
      return super.response()
    }
    return Promise.all([
      MissionsService.setModelDocRef(this.docRef).getAll(),
      this.authUserId.length === 0
        ? { data: {}}
        : MyTripsService.setAuthUser(this.authUserId)
            .getOne({ tripId: this.id })
    ]).then(([missionsCollection, myTripsEntity]) => {
      this.data.missions = missionsCollection.data
      this.data.isJoin = !isEmpty(myTripsEntity.data)
      return super.response()
    })
  }
}

module.exports = TripsEntity
