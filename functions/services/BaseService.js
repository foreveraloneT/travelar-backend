const { omit, get } = require('lodash')

class BaseService {
  constructor() {
    this._model = null
    this._Entity = null
    this._Collection = null
  }

  setModelDocRef(docRef) {
    this._model.setDocRef(docRef)
    return this
  }

  create(params) {
    return this._model.create(params)
      .then(data => new this._Entity(data))
  }

  updateById(id, params = {}) {
    return this._model.updateById(id, params)
      .then(() => this.getById(id))
  }

  getById(id) {
    return this._model.getById(id)
      .then(data => new this._Entity(data))
  }

  get(params) {
    const restricts = [
      'orderBy',
      'sortBy',
      'limit',
    ]
    const orderBy = get(params, 'orderBy', 'createAt')
    const sortBy = get(params, 'sortBy', 'desc')
    const order = [orderBy, sortBy]
    const limit = 0
    const where = Object.keys(omit(params, restricts))
      .map(key => ([key, '==', params[key]]))
    
    return this._model.get(where, order, limit)
      .then(data => new this._Collection(data))
  }

  getAll() {
    return this._model.getAll()
      .then(data => new this._Collection(data))
  }
}

module.exports = BaseService