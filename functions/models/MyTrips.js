const BaseModel = require('./BaseModel')

class MyTrips extends BaseModel {
  constructor() {
    super()
    this._default = {
        userName: '',
        tripId: '',
        status: 'in-progress', // "in-progress" "completed"
        name: '',
        detail: '',
        totalPoint: 0,
        extraPoint: 0,
        keywords: [],
        coverPicture: '',
        isFeature: false,

    }
    this.collection = 'myTrips'
  }
}

module.exports = new MyTrips
