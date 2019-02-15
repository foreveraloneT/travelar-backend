const BaseModel = require('./BaseModel')

class MyMissions extends BaseModel {
  constructor() {
    super()
    this._default = {
      tripId: "",
      userId: "",
      photo: {},
      checkIn: {},
      status: "in-progress" // "in-progress" "completed" "fail"
    }
    this.collection = 'myMissions'
  }
}

module.exports = MyMissions
