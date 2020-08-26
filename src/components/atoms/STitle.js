import React from 'react';
import { StyleSheet } from 'react-native';
import { Title, withTheme } from 'react-native-paper';
import { customFonts } from '@styles/customFonts';
import {
  SIZES,
  HalfCardImageWidth,
  getFontSize,
  HalfCardImageHeight
} from '@styles/sizes';

function STitle(props) {
  const {
    size,
    title,
    paddingTop,
    paddingBottom,
    style,
    half,
    semiHalf,
    paddingHorizontal,
    lineHeight,
    fontFamily,
    titleColor,
    shadows,
    uppercase,
    avoidTextScaling,
    numberOfLines,
    fontWeight,
    opacity
  } = props;

  const { colors } = props.theme;

  function scaledText(size) {
    if (avoidTextScaling) {
      return size;
    } else {
      return getFontSize(size);
    }
  }

  return (
    <Title
      numberOfLines={numberOfLines && numberOfLines}
      selectable={true}
      style={[
        shadows ? styles.shadows : null,
        {
          fontFamily: fontFamily ? fontFamily : customFonts.torstarDecSemiBold,
          fontSize: size ? scaledText(size) : scaledText(SIZES.FONT_LARGE_1),
          paddingTop: paddingTop ? paddingTop : 0,
          paddingBottom: paddingBottom ? paddingBottom : 0,
          paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
          width: half
            ? HalfCardImageWidth * 0.9
            : semiHalf
            ? HalfCardImageWidth * 0.65
            : '99%',
          color: titleColor ? titleColor : colors.text,
          textTransform: uppercase ? 'uppercase' : null,
          margin: 0,
          lineHeight: lineHeight
            ? scaledText(lineHeight)
            : scaledText(SIZES.LINE_HEIGHT),
          fontWeight: fontWeight ? fontWeight : '400',
          opacity: opacity ? opacity : 1
        },
        { ...style }
      ]}>
      {title}
    </Title>
  );
}

const styles = StyleSheet.create({
  shadows: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.41
  }
});

export default withTheme(STitle);
