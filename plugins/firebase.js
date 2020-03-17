import firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyAcuwhPhaQPAZfm4WYTdxKPJKf45C6-S2U",
    authDomain: "small-archives.firebaseapp.com",
    databaseURL: "https://small-archives.firebaseio.com",
    projectId: "small-archives",
    storageBucket: "small-archives.appspot.com",
    messagingSenderId: "953891967661",
    appId: "1:953891967661:web:66d2d8726a7188d852ec24"
}

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}




  