//Function to implement action creators ie: network requests through Redux.

import { bindActionCreators } from 'redux';

export const mapDispatchActions = (actions, dispatch) =>
  bindActionCreators(actions, dispatch);
