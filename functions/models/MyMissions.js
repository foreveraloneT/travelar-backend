const BaseModel = require('./BaseModel')

class MyMissions extends BaseModel {
  constructor() {
    super()
    this._default = {
      tripId: "",
      missionId: "",
      userId: "",
      photo: {},
      checkIn: {},
    }
    this.collection = 'myMissions'
  }
}

module.exports = new MyMissions
