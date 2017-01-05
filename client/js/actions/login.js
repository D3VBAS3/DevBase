import { browserHistory } from 'react-router';
import axios from 'axios';
import fetch from 'isomorphic-fetch';

function loginAttempt() {
  return {
    type: 'LOGIN_ATTEMPT'
  }
}

function loginSuccess(token, email) {
  localStorage.setItem('devBase_user_token', token);
  localStorage.setItem('devBase_user_email', email);
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
  //console.log("USERDATA IN LOGIN FUNCTION:",userData);
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
        
        // console.log('response', response);
        // console.log('response body', response.body);
        // console.log('response TOKEN', response.token);
        // dispatch(loginSuccess());
        // browserHistory.push('/profile');
        return response.json();
      })
      .then((data) => {
        // console.log('second then fetched RESPONSE', response);
        // //console.log('GOT COOKIE:', res.cookie);
        // dispatch(loginSuccess());
        // browserHistory.push('/profile');
        console.log('DATA', data);
        dispatch(loginSuccess(data.token, data.email));
        browserHistory.push('/profile');
      })
      .catch((error) => {
        dispatch(loginFail());
      });
    // return axios({
    //   method: 'post',
    //   url: '/login',
    //   data: userData
    // })
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       console.log('ERRROORRR not 200');
    //       throw new Error(res.statusText);
    //     }
    //   })
    //   .then((res) => {
    //     console.log('RESPONSE', res);
    //     //console.log('GOT COOKIE:', res.cookie);
    //     dispatch(loginSuccess());
    //     browserHistory.push('/profile');
    //   })
    //   .catch((err) => {
    //     dispatch(loginFail());
    //   });
  }
}