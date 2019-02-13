const { data: dataView } = require('../views')

class BaseEntity {
  constructor(data) {
    this.data = data
    this.view = dataView
  }

  get id() {
    return this.data.id || ''
  }

  response() {
    return this.view(this.data)
  }
}

module.exports = BaseEntity
