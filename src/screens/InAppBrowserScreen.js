import React from 'react';
import { withTheme } from 'react-native-paper';
import InAppBrowser from '@organisms/InAppBrowser';

function InAppBrowserScreen(props) {
  const { route } = props;
  return (
    <InAppBrowser data={route.params.data} isEmbed={route.params.isEmbed} />
  );
}

InAppBrowserScreen.navigationOptions = {
  headerStyle: {
    height: 50,
    backgroundColor: '#f6f6f6'
  },
  headerForceInset: { top: 'never', bottom: 'never' }
};

export default withTheme(InAppBrowserScreen);
