import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};
const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);
