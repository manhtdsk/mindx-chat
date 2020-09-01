import {setScreen} from '../index.js'
//đăng nhập user, nếu đúng chuyển qua màn hình chat
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setScreen('chat')
    }
    else {
        setScreen('login')
    }
  });