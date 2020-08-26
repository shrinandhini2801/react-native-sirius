import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  SIZES,
  SquareImageSize,
  HalfCardImageWidth,
  HalfCardImageHeight,
  tabletSquareImageSize,
  TabLayoutOneImageHeight
} from '@styles/sizes';
import { layout } from '@utils/Layout';
import { withTheme } from 'react-native-paper';

const width = layout.width;
const placeholder = require('../../../react/images/placeholder.png');

function Image(props) {
  const {
    url,
    half,
    semiHalf,
    withMargin,
    theme,
    square,
    bigSquare,
    style,
    borderRadius,
    resizeMode,
    source,
    tabletHalfScreenHeader,
    borderRadiusOnlyOnLeft,
    tabletOneThirdScreen,
    showPlaceholder,
    raisedCardWithBorder
  } = props;
  const imageSize = {
    width: width,
    height: SIZES.CardHeight
  };

  if (half || semiHalf) {
    imageSize.width = half
      ? HalfCardImageWidth
      : HalfCardImageWidth / SIZES.TAB_SEMIHALF_CARD_RATIO;
    imageSize.height = half
      ? HalfCardImageHeight
      : HalfCardImageHeight / SIZES.TAB_SEMIHALF_CARD_RATIO;
  }

  if (square) {
    imageSize.width = SquareImageSize;
    imageSize.height = SquareImageSize;
  }
  if (bigSquare) {
    imageSize.width = tabletSquareImageSize.width;
    imageSize.height = tabletSquareImageSize.height;
  }

  if (withMargin) {
    imageSize.width =
      imageSize.width - SIZES.BASE * (raisedCardWithBorder ? 2.1 : 2);
  }
  if (tabletHalfScreenHeader) {
    imageSize.width = width * 0.6;
    imageSize.height = TabLayoutOneImageHeight;
  }

  if (tabletOneThirdScreen) {
    imageSize.width = width * 0.625;
  }
  /**
   * Image component that shows the placeholder when the image loads or if unavaialable.
   */
  const imageProps = {
    style: [
      imageSize,
      {
        borderRadius: borderRadius || theme.roundness
      },
      { ...style }
    ]
  };
  return (
    <FastImage
      {...imageProps}
      fallback
      defaultSource={placeholder}
      source={
        showPlaceholder
          ? placeholder
          : {
              uri: url,
              priority: FastImage.priority.low
            }
      }
      resizeMode={resizeMode || FastImage.resizeMode.cover}
    />
  );
}

export default withTheme(Image);
