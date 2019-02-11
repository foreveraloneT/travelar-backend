const moment = require('moment')
const admin = require('../../services/admin')

class Trips {
  create(params) {
    const { name, detail } = params
    const data = {
      name,
      detail,
      createAt: moment().format(),
      updateAt: '',
    }
    
    return admin.firestore().collection('trips')
      .add(data)
      .then(docRef => Object.assign({ id: docRef.id }, data))
  }
}

module.exports = new Trips
