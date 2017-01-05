const defaultLoginState = {
  loggingIn: false,
  loginFail: false,
  loginSuccess: false
}

export default function login(state=defaultLoginState, action) {
  switch(action.type) {
    case 'LOGIN_ATTEMPT':
      return Object.assign({}, state, {
        loggingIn: true,
        loginFail: false,
        loginSuccess: false
      })
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        loggingIn: false,
        loginFail: true,
        loginSuccess: false
      })
    case 'LOGIN_FAIL':
      return Object.assign({}, state, {
        loggingIn: false,
        loginFail: false,
        loginSuccess: true
      })
    default:
      return state;
  }
}