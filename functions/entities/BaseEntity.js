const { omit } = require('lodash')

const { data: dataView } = require('../views')

class BaseEntity {
  constructor(data) {
    this.data = omit(data, ['docRef'])
    this._view = dataView
    this.docRef = data.docRef
    this.authUerId = ''
  }

  get id() {
    return this.data.id || ''
  }

  setAuthUser(id) {
    this.authUerId = id
    return this
  }

  response() {
    return new Promise((resolve) => 
      resolve(this._view(this.data))
    )
  }
}

module.exports = BaseEntity
