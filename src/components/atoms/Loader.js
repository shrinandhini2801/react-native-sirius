import React from 'react';
import { withTheme } from 'react-native-paper';
import { View, ActivityIndicator, Text } from 'react-native';

function Loader(props) {
  const { theme, loadingText } = props;

  return (
    <View
      style={[
        styles.loader,
        {
          backgroundColor: theme.colors.background
        }
      ]}>
      <ActivityIndicator size="large" color={theme.colors.loader} />
      {loadingText && (
        <Text style={{ color: theme.colors.text }}>{loadingText}</Text>
      )}
    </View>
  );
}
const styles = {
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
};

export default withTheme(Loader);
