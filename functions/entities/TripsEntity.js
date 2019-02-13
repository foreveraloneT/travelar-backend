const BaseEntity = require('./BaseEntity')
const MissionsService = require('../services/MissionsService')

class TripsEntity extends BaseEntity {
  constructor(data) {
    super(data)
  }

  response() {
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
