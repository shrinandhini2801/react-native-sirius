import React from 'react';
import { Title, withTheme } from 'react-native-paper';
import { customFonts } from '@styles/customFonts';
import { SIZES, getFontSize } from '@styles/sizes';

function SArticle(props) {
  const {
    size,
    title,
    paddingTop,
    paddingBottom,
    style,
    lineHeight,
    avoidTextScaling,
    fontFamily,
    color,
    numberOfLines
  } = props;

  function scaledText(size) {
    if (avoidTextScaling) {
      return size;
    } else {
      return getFontSize(size);
    }
  }
  return (
    title && (
      <Title
        numberOfLines={numberOfLines && numberOfLines}
        style={[
          {
            fontFamily: fontFamily || customFonts.torstarTextO2Roman,
            fontSize: size ? scaledText(size) : scaledText(SIZES.BASE),
            lineHeight: lineHeight
              ? scaledText(lineHeight)
              : scaledText(SIZES.BASE + 4),
            paddingTop: paddingTop ? paddingTop : 0,
            paddingBottom: paddingBottom ? paddingBottom : 0,
            color: color || props.theme.colors.text
          },
          { ...style }
        ]}>
        {title}
      </Title>
    )
  );
}

export default withTheme(SArticle);
