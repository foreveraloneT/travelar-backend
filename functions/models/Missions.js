const BaseModel = require('./BaseModel')

class Missions extends BaseModel {
  constructor() {
    super()
    this._default = {
      name: '',
      detail: '',
      // objective: '',
      // expiredDate: '',
      // checkIn: true,
      // picture: true,
      // checkInPoint: 0,
      // picturePoint: 0,
      // latitude: 0,
      // logitude: 0,
    }
    this.collection = 'missions'
  }
}

module.exports = new Missions
