class BaseService {
  constructor() {
    this._model = null
    this._Entity = null 
  }

  create(params) {
    return this._model.create(params)
      .then(data => new this._Entity(data))
  }
}

module.exports = BaseService