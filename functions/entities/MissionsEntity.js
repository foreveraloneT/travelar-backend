const { isArray } = require('lodash')

const BaseEntity = require('./BaseEntity')

class MissionsEntity extends BaseEntity {
  constructor(data) {
    super(data)
  }
}

module.exports = MissionsEntity