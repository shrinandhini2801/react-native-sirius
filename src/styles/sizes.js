import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import SelectedFontContext from '@context/SelectedFontContext';
import { layout } from '@utils/Layout';

export const extraPaddingNeeded = StatusBar.currentHeight > 24;
export const DeviceHeight = layout.height;
export const DeviceWidth = layout.width;
/**
 * Its a custom font scaling method that scales the font sizes according to the global font scaling
 * value from text slider (in settings page)
 * @param  size
 */
export function getFontSize(size) {
  const [selectedFontScale] = useContext(SelectedFontContext);
  if (size <= SIZES.BASE) {
    return Math.round(size + size * selectedFontScale);
  } else {
    return Math.round(size + (size / 1.2) * selectedFontScale);
  }
}
/** RA - Right Aligned card */
export const SIZES = {
  MINIFONT: 10,
  BASE: 16,
  MARGIN: 16,
  PADDING: 16,
  FONT: 12,
  HALF_CARD_FONT: 20,
  FONT_LARGE_1: 28,
  FONT_LARGE_2: layout.isMobile ? 32 : 36,
  ICON: 16,
  CardHeight: 224,
  CardHeightHalf: 104,
  PaddingHorizontal: 32,
  LABELHEIGHT: 16,
  LOGO_HEIGHT: 60,
  LOGO_WIDTH: layout.isMobile ? 180 : 250,
  HALF_CARD_HEIGHT_RATIO: 0.634,
  ARTICLE_MAINART_RATIO: 0.661,
  RAISED_CARD_HEIGHT_RATIO: 1.055,
  PARA_FONTSIZE: 18,
  FULLBLEED_CARD_HEIGHT_RATIO: 1.442,
  LINE_HEIGHT: 24,
  STATUSBAR_HEIGHT: 40,
  TAB_RA_HALFCARD_WIDTH: layout.width / 3.5,
  TAB_RA_TWOTHIRDCARD_WIDTH: layout.width / 2.3,
  TAB_RA_FULLCARD_WIDTH: layout.width / 1.6,
  TAB_SEMIHALF_CARD_RATIO: 1.536,
  TABLET_HEADLINE: 46
};

export const SquareImageSize = layout.isMobile ? 108 : 110;
export const tabletSquareImageSize = {
  height: 155,
  width: 235
};
export const TabLayoutOneImageHeight = 320;

export const RoundImageSize = 80;
export const TextSpaceAfterSquareImage = layout.width - (108 + SIZES.BASE * 3);

export const HalfCardImageWidth =
  layout.width / 2 - (SIZES.MARGIN + SIZES.MARGIN / 2);
export const HalfCardImageHeight =
  HalfCardImageWidth * SIZES.HALF_CARD_HEIGHT_RATIO;
export const AUTHOR_COMPACT_VIEW_LIMIT = 4;
export const AD_HEIGHT = 345;
export const TABLET_AD_HEIGHT = 200;
export const PADDING_BW_ITEMS = 24;
export const MAINART_MAX_HEIGHT = layout.width * SIZES.ARTICLE_MAINART_RATIO;
export const MAINART_MIN_HEIGHT = 0;
export const statusBarPadding = 30;

export const RaisedCardImageWidth = layout.width - SIZES.MARGIN * 2;
export const RaisedCardImageHeight =
  RaisedCardImageWidth * SIZES.RAISED_CARD_HEIGHT_RATIO;
export const FullBleedHeight = layout.isMobile
  ? layout.width * SIZES.FULLBLEED_CARD_HEIGHT_RATIO
  : layout.width * (SIZES.FULLBLEED_CARD_HEIGHT_RATIO / 1.8);
