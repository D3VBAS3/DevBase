import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

function loginAttempt() {
  return {
    type: 'LOGIN_ATTEMPT'
  }
}

function loginSuccess(token, username) {
  localStorage.setItem('devBase_user_token', token);
  localStorage.setItem('devBase_username', username);
  console.log("LOCAL STORAGE:", localStorage);
  return {
    type: 'LOGIN_SUCCESS'
  }
}

function loginFail() {
  return {
    type: 'LOGIN_FAIL'
  }
}

export default function login(userData) {

  return function(dispatch) {
    dispatch(loginAttempt());

    return fetch('/login',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('ERRROORRR not 200');
          throw new Error(response.statusText);
        }
        
        return response.json();
      })
      .then((data) => {
        dispatch(loginSuccess(data.token, data.username));
        browserHistory.push('/profile');
      })
      .catch((error) => {
        dispatch(loginFail());
      });
  }
}