const { toNumber } = require('lodash')
const moment = require('moment')
const { isNull } = require('lodash')

const admin = require('../firebase/admin')

class BaseModel {
  constructor() {
    this._default = {}
    this.collection = 'base'
    this.docRef = null
  }

  _getNow() {
    return toNumber(moment().format('x'))
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
      updateAt: 0,
    })

    return this.collectionRef.add(data)
      .then(docRef => Object.assign({ docRef, id: docRef.id }, data))
  }

  updateById(id, edit = {}) {
    const docRef = this.collectionRef.doc(id)
    const data = Object.assign({
      updateAt: this._getNow(),
    }, edit)

    return docRef.set(data, { merge: true })
      .then(() => Object.assign({ docRef, id }, data))
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

  get(where = [], orderBy = ['createAt', 'desc'], limit = 0) {
    let query = this.collectionRef
    where.forEach((whereClause) => {
      query = query.where(...whereClause)
    })

    if (orderBy.length > 0) {
      query = query.orderBy(...orderBy)
    }
    if (limit > 0) {
      query = query.limit(limit)
    }
    return query.get()
      .then(querySnapshot => querySnapshot.docs.map(doc =>
        Object.assign({ id: doc.id }, doc.data())
      ))
  }

  getAll(orderBy = ['createAt', 'desc']) {
    return this.get([], orderBy)
  }
}

module.exports = BaseModel
