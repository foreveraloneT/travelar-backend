const BaseModel = require('./BaseModel')

class Missions extends BaseModel {
  constructor() {
    super()
    this._default = {
      name: '',
      detail: '',
      checkIn: {},
      photo: {},
      order: 0,
    }
    this.collection = 'missions'
  }

  getAll(orderBy = ['order', 'asc']) {
    return super.getAll(orderBy)
  }
}

module.exports = new Missions
