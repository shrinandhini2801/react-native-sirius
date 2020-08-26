import { TOGGLE_DARK_MODE, LOGIN, LOGOUT, SELECTED_TAB } from './types';
import {
  AuthNativeTraditional,
  ForgotPassword
} from 'torstar-janrain-react-native';
import * as Config from '@rootConfig/apis.config';

// can be Config.janrain_dev or Config.janrain_prod
const env = Config.janrain_dev;

export function toggleDarkMode(selectedTheme) {
  return {
    type: TOGGLE_DARK_MODE,
    payload: selectedTheme
  };
}
export function loginPending() {
  return {
    type: LOGIN.PENDING
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN.LOGIN,
    payload: user
  };
}
export function loginError(err) {
  return {
    type: LOGIN.ERROR,
    payload: err
  };
}
export function setTabSelected(index) {
  return {
    type: SELECTED_TAB,
    payload: index
  };
}
export function login(email, password) {
  return dispatch => {
    dispatch(loginPending());
    AuthNativeTraditional(email, password, env)
      .then(res => {
        console.log(res, 'redux_success');
        dispatch(loginSuccess(res));
      })
      .catch(err => {
        console.log(err, 'redux_err');
        dispatch(loginError(err));
      });
  };
}
export function logout() {
  return {
    type: LOGOUT
  };
}
export function resetPassword(email) {
  return () => {
    ForgotPassword(email, env)
      .then(res => {
        console.log(res, 'forgot_success');
      })
      .catch(err => {
        console.log(err, 'forgot_fail');
      });
  };
}
