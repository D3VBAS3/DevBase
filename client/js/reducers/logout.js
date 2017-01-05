const defaultLogoutState = {
  loggingOut: false,
  loginSuccess: false
}

export default function logout(state=defaultLogoutState, action) {
  switch(action.type) {
    case 'LOGOUT_ATTEMPT':
      return Object.assign({}, state, {
        loggingOut: true,
        loginSuccess: false
      })
    case 'LOGOUT_SUCCESS':
      return Object.assign({}, state, {
        logginOut: false,
        loginSuccess: true
      })
    default:
      return state;
  }
}