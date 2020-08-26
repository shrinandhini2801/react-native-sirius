import React from 'react';
import { View, Image, StatusBar, Platform } from 'react-native';
import { withTheme } from 'react-native-paper';
import { SIZES } from '@styles/sizes';
import { withNavigation } from '@react-navigation/compat';
import { useMappedState } from 'redux-react-hook';

const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});

function AppHeader(props) {
  const { theme } = props;
  const { selectedTheme } = useMappedState(mappedState);
  let logo =
    selectedTheme === 'light'
      ? require('../../../react/images/logo.png')
      : require('../../../react/images/logo_dark_mode_.png');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.headerBackground
        },
        Platform.OS === 'ios' && styles.iosStyle,
        Platform.OS === 'android' && styles.androidStyle
      ]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.headerBackground}
      />
      <Image
        resizeMode={Platform.OS === 'ios' ? 'contain' : 'center'}
        source={logo}
        style={styles.imageStyle}
      />
    </View>
  );
}

const styles = {
  iosStyle: {
    flex: 1
  },
  androidStyle: {
    height: SIZES.LOGO_HEIGHT,
    width: '100%'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  imageStyle: {
    width: SIZES.LOGO_WIDTH,
    alignContent: 'center',
    height: SIZES.LOGO_HEIGHT,
    resizeMode: 'contain',
    position: 'absolute',
    top: -1,
    backgroundColor: 'transparent'
  }
};

export default withTheme(withNavigation(AppHeader));
