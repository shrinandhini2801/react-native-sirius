import { TOGGLE_DARK_MODE, LOGIN, LOGOUT, SELECTED_TAB } from './types';

export const initialState = {
  selectedTheme: 'light',
  user: {},
  login_error: false,
  login_pending: false
};
export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        selectedTheme: action.payload
      };
    case LOGIN.PENDING:
      return {
        ...state,
        login_pending: true,
        login_error: false
      };
    case LOGIN.LOGIN:
      return {
        ...state,
        login_pending: false,
        login_error: false,
        user: action.payload
      };
    case LOGIN.ERROR:
      return {
        ...state,
        login_pending: false,
        login_error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: {}
      };
    case SELECTED_TAB:
      return {
        ...state,
        selected_tab: action.payload
      };
    default:
      return state;
  }
}
