import React from 'react';
import { Text, withTheme } from 'react-native-paper';
import { Platform } from 'react-native';
import { customFonts } from '@styles/customFonts';
import { SIZES, HalfCardImageWidth, getFontSize } from '@styles/sizes';

function SectionLabel(props) {
  const {
    label,
    paddingTop,
    paddingBottom,
    half,
    style,
    letterSpacing
  } = props;

  const { colors } = props.theme;

  return (
    <Text
      style={[
        {
          fontFamily: customFonts.merriweatherSansBlack,
          fontSize: getFontSize(SIZES.FONT - 1),
          fontWeight: Platform.OS === 'ios' ? 'bold' : '800',
          paddingTop: paddingTop ? paddingTop : 0,
          paddingBottom: paddingBottom ? paddingBottom : 0,
          letterSpacing: letterSpacing ? letterSpacing : 1,
          width: half ? HalfCardImageWidth - 32 : '100%',
          color: colors.sectionArticle
        },
        { ...style }
      ]}>
      {label && label.toUpperCase()}
    </Text>
  );
}

export default withTheme(SectionLabel);
