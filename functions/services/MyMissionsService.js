const { cloneDeep, isEmpty } = require('lodash')

const BaseService = require('./BaseService')
const MyMissions = require('../models/MyMissions')
const MyMissionsEntity = require('../entities/MyMissionsEntity')
const MyMissionsCollection = require('../collections/MyMissionsCollection')

class MyMissionsService extends BaseService {
  constructor() {
    super()
    this._model = MyMissions
    this._Entity = MyMissionsEntity
    this._Collection = MyMissionsCollection
  }

  getOne(params) {
    if (isEmpty(params.userId)) {
      const enhanceParams = Object.assign({
        userId: this.authUserId
      }, params)
      return super.getOne(enhanceParams)
    }
    return super.getOne(params)
  }

  send(missionId, params) {
    return this.getOne({ missionId })
      .then((entity) => {
        const edit = cloneDeep(params)
        if (!isEmpty(params.photo)) {
          edit.photo.status = 'waiting'
        }
        if (!isEmpty(params.checkIn)) {
          edit.checkIn.status = 'verified'
        }
        return this.updateById(entity.id, edit)
      })
  }

  verifyPhoto(params) {
    return this.getOne({ missionId: params.missionId, userId: params.userId })
      .then((entity) =>
        entity.updateById(entity.id, {
          photo: { status: 'verified' }
        })
      )
  }

  declinePhoto(params) {
    return this.getOne({ missionId: params.missionId, userId: params.userId })
      .then((entity) =>
        entity.updateById(entity.id, {
          photo: { status: 'declined' }
        })
      )
  }
}

module.exports = new MyMissionsService
