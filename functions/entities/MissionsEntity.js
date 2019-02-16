const { isEmpty } = require('lodash')
const BaseEntity = require('./BaseEntity')
const MyMissionsService = require('../services/MyMissionsService')

class MissionsEntity extends BaseEntity {
  constructor(data) {
    super(data)
  }

  response() {
    if (isEmpty(this.data) || this.authUserId.length === 0) {
      return super.response()
    }
    return MyMissionsService.setAuthUser(this.authUserId)
      .getOne({ missionId: this.id })
      .then((myMissionEntity) => {
        if (!isEmpty(myMissionEntity.data)) {
          const myMission = myMissionEntity.data
          if (!isEmpty(myMission.checkIn)) {
            this.data.checkIn = Object.assign(this.data.checkIn, myMission.checkIn)
          }
          if (!isEmpty(myMission.photo)) {
            this.data.photo = Object.assign(this.data.photo, myMission.photo)
          }
        }
        return super.response()
      })
  }
}

module.exports = MissionsEntity