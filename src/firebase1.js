import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// const firebaseConfig = {
//   apiKey: 'AIzaSyDELtExiZMxa_9BmlrObz56lxcTugL30mI',
//   authDomain: 'portal-93461.firebaseapp.com',
//   projectId: 'portal-93461',
//   storageBucket: 'portal-93461.appspot.com',
//   messagingSenderId: '760536690043',
//   appId: '1:760536690043:web:f9c7a321c909985e47a1de',
//   measurementId: 'G-18DQBTQY7L',
// }

const firebaseConfig = {
  apiKey: "AIzaSyAaj_Cqd3aWe0m7dXCNlDuC4MJ3m46DK5Q",
  authDomain: "est-project-3d555.firebaseapp.com",
  projectId: "est-project-3d555",
  storageBucket: "est-project-3d555.appspot.com",
  messagingSenderId: "666962720828",
  appId: "1:666962720828:web:1803a70e398284acb02b39",
  measurementId: "G-PCJTGKZL09"
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
// const storageRef = firebase.storage.ref()
const db = firebase.firestore()

export { storage, app }
export default db
