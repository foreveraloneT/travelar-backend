const admin = require('firebase-admin')

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://travela-dev-54075.firebaseio.com"
});

admin.firestore().collection('trips')
  .where('status', '==', 'disable')
  .orderBy('createAt', 'desc')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log('doc', doc.data())
    })
    return true
  })
  .catch((error) => { console.log('error', error) })