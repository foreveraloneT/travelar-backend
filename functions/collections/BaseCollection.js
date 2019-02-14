const { data: dataView } = require('../views')

class BaseCollection {
  constructor(data) {
    this.data = data
    this._view = dataView
  }

  response() {
    return new Promise((resolve) => 
      resolve(this._view(this.data))
    )
  }
}

module.exports = BaseCollection
