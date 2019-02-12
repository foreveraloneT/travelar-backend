const { isArray } = require('lodash')

const { data: dataView } = require('../views')

class BaseEntity {
  constructor(data) {
    this._data = data
  }

  getList() {
    return this._data
  }

  getOne() {
    return this._data
  }

  get() {
    return isArray(this._data) ? this.getList() : this.getOne()
  }

  response() {
    return dataView(this.get())
  }
}

module.exports = BaseEntity
