const { isEmpty } = require('lodash')

const BaseEntity = require('./BaseEntity')
const MissionsService = require('../services/MissionsService')
const MyMissionsService = require('../services/MyMissionsService')

class TripsEntity extends BaseEntity {
  constructor(data) {
    super(data)
  }

  response() {
    if (isEmpty(this.data)) {
      return super.response()
    }
    return MissionsService.setModelDocRef(this.docRef)
      .getAll()
      .then((missionsCollection) => {
        Object.assign(this.data, {
          missions: missionsCollection.data
        })
        return super.response()
      })
  }
}

module.exports = TripsEntity
