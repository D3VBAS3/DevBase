import { browserHistory } from 'react-router';
import axios from 'axios';

function logOutAttempt() {
  return {
    type: 'LOGOUT_ATTEMPT'
  }
}

function logoutSuccess() {
  return {
    type: 'LOGOUT_SUCCESS'
  }
}

export default function logout() {
  return function(dispatch) {
    dispatch(logOutAttempt())

    return axios({
      method: 'post',
      url: '/logout'
    })
      .then((res) => {
        dispatch(logoutSuccess())
        browserHistory.push('/')
      })
      .catch((err) => {
        console.log('Logout Error:', err);
      })
  }
}