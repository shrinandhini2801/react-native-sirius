import React from 'react';
import { View, Platform } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { SIZES, getFontSize } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';

function TrustLabel(props) {
  const { trustLabel } = props;
  const { colors } = props.theme;

  if (!trustLabel || !trustLabel.name) {
    return null;
  }
  return (
    <View
      style={{
        paddingBottom: 0,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.7,
        borderColor: colors.onBackground
      }}>
      <Text
        style={{
          fontFamily:
            Platform.OS === 'ios'
              ? customFonts.merriweatherSansExtraBold
              : customFonts.merriweatherSansBold,
          fontWeight: Platform.OS === 'ios' ? 'bold' : '400',
          paddingHorizontal: 5,
          textTransform: 'uppercase',
          fontSize: getFontSize(SIZES.MINIFONT),
          justifyContent: 'center',
          textAlign: 'center',
          color: colors.secondaryText,
          paddingBottom: Platform.OS === 'android' ? 2 : 0
        }}>
        {trustLabel.name}
      </Text>
    </View>
  );
}

export default withTheme(TrustLabel);
