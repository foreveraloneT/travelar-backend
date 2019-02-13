const { omit } = require('lodash')

const BaseModel = require('./BaseModel')
const Missions = require('./Missions')

class Trips extends BaseModel {
  constructor() {
    super()
    this._default = {
      name: '',
      detail: '',
      status: 'disable',
      missions: [],
      // expiredDate: '',
      // extraPoint: 0,
      // latitude: 0,
      // logitude: 0,
    }
    this.collection = 'trips'
  }
}

module.exports = new Trips
