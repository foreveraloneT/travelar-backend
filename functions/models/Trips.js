const { omit } = require('lodash')

const BaseModel = require('./BaseModel')
const Missions = require('./Missions')

class Trips extends BaseModel {
  constructor() {
    super()
    this._default = {
      name: '',
      detail: '',
      status: 'unpublished',
      missionsCount: 0,
      totalPoint: 0,
      extraPoint: 0,
      keywords: [],
      coverPicture: '',
      isFeature: false,
    }
    this.collection = 'trips'
  }
}

module.exports = new Trips
