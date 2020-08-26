import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { withTheme } from 'react-native-paper';
import { SIZES, PADDING_BW_ITEMS, getFontSize } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';
import { localStrings } from '@utils/i18n';
import Slider from '@react-native-community/slider';
import SelectedFontContext from '@context/SelectedFontContext';
import { white, grey400, grey600 } from '@styles/colors';

const TextSlider = props => {
  const colors = props.theme.colors;
  const [selectedFontScale, setSelectedFontScale] = useContext(
    SelectedFontContext
  );
  const [tracks, settracks] = useState([]);
  const [fontValue, setFontValue] = useState(selectedFontScale);
  //console.log('fontval onitial', fontValue);
  let fontConfig = {
    default: 1.2,
    minimumSliderValue: 0,
    maximumSliderValue: 1.2,
    steps: 8
  };
  let step =
    (fontConfig.maximumSliderValue - fontConfig.minimumSliderValue) /
    fontConfig.steps;

  function onValueChange(val) {
    setFontValue(val);
  }

  function onSlidingComplete(val) {
    setSelectedFontScale(val);
  }

  function onLayout(event) {
    const ticks = [];
    const width = event.nativeEvent.layout.width;
    const tickWidth = width / fontConfig.steps;
    let stepCounter = fontConfig.minimumSliderValue;

    for (let i = 0; i < fontConfig.steps; i++) {
      const value = tickWidth * i;
      const offSet = {
        left: Math.round(value)
      };
      const borderColor =
        stepCounter === fontConfig.default ? { borderColor: white } : null;
      ticks.push(
        <View key={i} style={[styles.trackLine, offSet, borderColor]} />
      );
      stepCounter = parseFloat((stepCounter + step).toFixed(2));
    }
    ticks.splice(0, 1);
    settracks(ticks);
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.disabled }
      ]}>
      <View style={{ marginHorizontal: 5 }}>
        <Text style={[styles.SmallAStyle, { color: colors.primary }]}>
          {localStrings('settings.fontA')}
        </Text>
        <Text style={[styles.BigAStyle, { color: colors.primary }]}>
          {localStrings('settings.fontA')}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal:
            Platform.OS === 'ios' ? SIZES.PaddingHorizontal : SIZES.PADDING
        }}
        onLayout={e => {
          onLayout(e);
        }}>
        {tracks}
        <Slider
          step={step}
          style={styles.slider}
          minimumValue={fontConfig.minimumSliderValue}
          maximumValue={fontConfig.maximumSliderValue}
          onValueChange={val => onValueChange(val)}
          onSlidingComplete={val => onSlidingComplete(val)}
          value={fontValue}
          thumbTintColor={colors.primary}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={grey600}
        />
      </View>

      <Text
        style={[
          styles.text,
          {
            color: colors.sectionTitle,
            fontSize: getFontSize(SIZES.BASE),
            fontFamily: customFonts.torstarTextRoman,
            lineHeight: getFontSize(SIZES.BASE + 4)
          }
        ]}>
        {localStrings('slider_dummy')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: PADDING_BW_ITEMS,
    paddingBottom: PADDING_BW_ITEMS,
    borderBottomWidth: 0.5
  },
  text: {
    textAlign: 'auto'
  },
  SmallAStyle: {
    position: 'absolute',
    left: 12,
    top: Platform.OS === 'ios' ? 10 : 8,
    fontSize: SIZES.BASE
  },
  BigAStyle: {
    position: 'absolute',
    right: 1,
    top: Platform.OS === 'ios' ? 1 : -5,
    fontSize: SIZES.BASE * 2
  },
  slider: {
    height: 40,
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center'
  },
  trackLine: {
    borderWidth: 0.6,
    height: Platform.OS === 'ios' ? SIZES.FONT : 10,
    borderColor: grey400,
    position: 'absolute',
    top: 15
  }
});

export default withTheme(TextSlider);
