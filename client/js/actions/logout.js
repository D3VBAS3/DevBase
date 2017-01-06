import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

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
    dispatch(logOutAttempt());

    return fetch('/logout',{
      method: 'post',
    })
      .then((response) => {
        dispatch(logoutSuccess())
        browserHistory.push('/');
      })
      .catch((error) => {
        console.log('Logout Error:', error);
      })
  }
}