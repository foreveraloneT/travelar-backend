const { data: dataView } = require('../views')

class BaseCollection {
  constructor(data) {
    this.data = data
    this.view = dataView
  }

  response() {
    return new Promise((resolve) => 
      resolve(this.view(this.data))
    )
  }
}

module.exports = BaseCollection
