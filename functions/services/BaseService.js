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

  getById(id) {
    return this._model.getById(id)
      .then(data => new this._Entity(data))
  }

  getAll() {
    return this._model.getAll()
    .then(data => new this._Collection(data))
  }
}

module.exports = BaseService