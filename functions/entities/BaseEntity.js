const { omit } = require('lodash')

const { data: dataView } = require('../views')

class BaseEntity {
  constructor(data) {
    this.data = omit(data, ['docRef'])
    this.view = dataView
    this.docRef = data.docRef
  }

  get id() {
    return this.data.id || ''
  }

  response() {
    return new Promise((resolve) => 
      resolve(this.view(this.data))
    )
  }
}

module.exports = BaseEntity
