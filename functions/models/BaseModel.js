const moment = require('moment')
const { pick, isString, isNull } = require('lodash')

const admin = require('../firebase/admin')

class BaseModel {
  constructor() {
    this._default = {}
    this.collection = 'base'
    this.docRef = null
  }

  _getNow() {
    return moment().format()
  }

  // for deep down structure
  setDocRef(docRef) {
    this.docRef = docRef
    return this
  }

  get collectionRef() {
    if (!isNull(this.docRef)) {
      return this.docRef.collection(this.collection)
    }
    return admin.firestore().collection(this.collection)
  }

  create(item) {
    const data = Object.assign(this._default, item, {
      createAt: this._getNow(),
      updateAt: '',
    })

    return this.collectionRef.add(data)
      .then(docRef => Object.assign({ docRef, id: docRef.id }, data))
  }

  getById(id) {
    const docRef = this.collectionRef.doc(id)
    return docRef.get()
      .then((doc) => {
        if (doc.exists) {
          return Object.assign({ docRef, id: docRef.id }, doc.data())
        }
        return { docRef: null }
      })
  }

  getAll() {
    return this.collectionRef.get()
      .then(querySnapshot => querySnapshot.docs.map(doc =>
        Object.assign({ id: doc.id }, doc.data())
      ))
  }
}

module.exports = BaseModel
