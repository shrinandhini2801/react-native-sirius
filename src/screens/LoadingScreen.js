import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Title, withTheme } from 'react-native-paper';
import { localStrings } from '@utils/i18n';

function LoadingScreen(props) {
  const { showLoader, showNoConnection, theme } = props;
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {showNoConnection && (
        <>
          <Title>{localStrings('loaders.no_connection')}</Title>
        </>
      )}
      {showLoader && (
        <>
          <ActivityIndicator size={'large'} color={theme.colors.loader} />
        </>
      )}
    </View>
  );
}

export default withTheme(LoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
});
