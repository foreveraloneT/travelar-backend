const { isArray } = require('lodash')

const BaseEntity = require('./BaseEntity')

class TripsEntity extends BaseEntity {
  constructor(data) {
    super(data)
  }

  getOne() {
    return this._data
  }
}

module.exports = TripsEntity
