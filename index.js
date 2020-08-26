if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import React, { useState } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { store, persistor } from './src/redux/store';
import SelectedFontContext from '@context/SelectedFontContext';
import { StoreContext } from 'redux-react-hook';
import { PersistGate } from 'redux-persist/lib/integration/react';

export default function Main() {
  const fontScale = useState(0);
  return (
    <StoreContext.Provider value={store}>
      <SelectedFontContext.Provider value={fontScale}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </SelectedFontContext.Provider>
    </StoreContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
