import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import DateDisplay from '@atoms/DateDisplay';
import WeatherStats from '@atoms/WeatherStats';
import { SIZES } from '@styles/sizes';

function DateWeatherDisplay(props) {
  const { colors } = props.theme;
  return (
    <View
      style={[
        styles.bottomBorder,
        { backgroundColor: colors.background, borderColor: colors.disabled }
      ]}>
      <View style={styles.container}>
        <DateDisplay />
        <WeatherStats />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.BASE * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: SIZES.BASE,
    marginRight: SIZES.BASE
  },
  bottomBorder: {
    borderBottomWidth: 1
  }
});

export default withTheme(DateWeatherDisplay);
