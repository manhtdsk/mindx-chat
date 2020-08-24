import {setScreen} from '../index.js'

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setScreen('chat')
    }
    else {
        setScreen('login')
    }
  });