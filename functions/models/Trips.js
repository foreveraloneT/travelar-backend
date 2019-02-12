const { omit } = require('lodash')

const BaseModel = require('./BaseModel')
const Missions = require('./Missions')

class Trips extends BaseModel {
  constructor() {
    super()
    this._default = {
      name: '',
      detail: '',
      status: 'disable',
      missions: [],
      // expiredDate: '',
      // extraPoint: 0,
      // latitude: 0,
      // logitude: 0,
    }
    this.collection = 'trips'
  }

  create(item) {
    const missions = [
      {
        name: 'test m1',
        detail: 'test1'
      },
      {
        name: 'test m2',
        detail: 'test2'
      }
    ]
    return Promise.all(missions.map(mission => Missions.create(mission)))
      .then((missionRefs) => {
        const enhancedItem = Object.assign(item, {
          missions: missionRefs.map(missionRef => missionRef.id)
        })
        return super.create(enhancedItem)
      })
  }
}

module.exports = new Trips
