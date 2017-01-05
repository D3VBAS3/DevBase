import login from './login';
import logout from './logout';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ login, logout });

const rootReducer = (state, action) => {

  if (action.type === 'LOGOUT_SUCCESS') {
      state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;