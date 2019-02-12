const moment = require('moment')
const admin = require('../firebase/admin')
const { pick } = require('lodash')

class BaseModel {
  constructor() {
    this._default = {}
    this.collection = 'base'
  }

  _getNow() {
    return moment().format()
  }

  create(item) {
    const data = Object.assign(this._default, item, {
      createAt: this._getNow(),
      updateAt: '',
    })

    return admin.firestore().collection(this.collection)
      .add(data)
      .then(docRef => Object.assign({ id: docRef.id }, data))
  }
}

module.exports = BaseModel
