import React from 'react';
import FastImage from 'react-native-fast-image';
import { layout } from '@utils/Layout';
import { withTheme } from 'react-native-paper';
import { ImageBackground as RNIMAGE } from 'react-native';

const width = layout.width;
const placeholder = require('../../../react/images/placeholder.png');

function BackgroundImage(props) {
  const { url, style, showPlaceholder } = props;

  return (
    <FastImage
      source={
        showPlaceholder
          ? placeholder
          : {
              uri: url,
              priority: FastImage.priority.low
            }
      }
      fallback
      defaultSource={placeholder}
      style={{ ...style }}
      resizeMode={FastImage.resizeMode.cover}>
      {props.children}
    </FastImage>
  );
}

export default withTheme(BackgroundImage);
