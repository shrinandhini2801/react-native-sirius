import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SIZES, RoundImageSize } from '@styles/sizes';
import { layout } from '@utils/Layout';
import { withTheme } from 'react-native-paper';

const width = layout.width;
const placeholder = require('../../../react/images/placeholder.png');

function RoundImage(props) {
  const { url } = props;

  return (
    <FastImage
      style={[
        {
          height: RoundImageSize,
          width: RoundImageSize,
          borderRadius: RoundImageSize / 2
        }
      ]}
      fallback
      defaultSource={placeholder}
      source={{
        uri: url,
        priority: FastImage.priority.low
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}

export default withTheme(RoundImage);
