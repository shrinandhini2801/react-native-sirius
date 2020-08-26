import React, { useState } from 'react';
import Image from '@atoms/Image';
import { View, TouchableOpacity, Image as RNIMAGE } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { withTheme, Caption, Divider } from 'react-native-paper';
import { AEM_ENDPOINT } from '@rootConfig/apiConfig';
import { PADDING_BW_ITEMS, DeviceWidth, SIZES } from '@styles/sizes';
import { TYPES } from '@services/ArticleBodyTypes';
import PictureCredit from '@atoms/PictureCredit';
import { layout } from '@utils/Layout'

const infoImage = require('../../../react/images/infoIcon.png');
const gallImage = require('../../../react/images/gallery.png');
/**
 * Construct the proper URL with AEM end point
 * @param {} url
 */
function getProperURL(url) {
  return url.startsWith(AEM_ENDPOINT) ? url : `${AEM_ENDPOINT}${url}`;
}

function ArticleBodyImages(props) {
  const { data, theme, navigation, isMainart, isSecondary } = props;
  let URL = null;
  let height = 0;
  let imageSize = null;
  if (data.type === TYPES.SLIDESHOW) {
    if (data.images && data.images.length > 0 && data.images[0].url) {
      URL = getProperURL(data.images[0].url);
      imageSize = data.images[0].origImageSize
        ? data.images[0].origImageSize.split('x')
        : null;
    }
  } else {
    URL = data.url ? getProperURL(data.url) : null;
    imageSize = data.origImageSize ? data.origImageSize.split('x') : null;
  }

  if (imageSize) {
    /**
     * imageSize[1] is width and imageSize[0] is height
     */
    let heightRatio = Number(imageSize[1]) / Number(imageSize[0]);
    height = DeviceWidth * heightRatio;
  }

  function navigateToGallery() {
    navigation.navigate('Gallery', {
      data: data,
      isMainart: isMainart
    });
  }
  const calculateTop = () => {
    if (isSecondary) {
      return data.type == TYPES.SLIDESHOW && data.images.length > 1 ? 0 : 20;
    } else {
      return 0;
    }
  };

  if (URL) {
    let creditAvailable = data.credit && data.credit !== '';
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={() => navigateToGallery()} activeOpacity={2}>
          <Image
            url={URL}
            borderRadius={1}
            style={{
              width: DeviceWidth,
              height: height,
              marginBottom: creditAvailable ? 0 : PADDING_BW_ITEMS
            }}
            resizeMode="cover"
          />
          <RNIMAGE
            source={
              data.type === TYPES.SLIDESHOW && data.images.length > 1
                ? gallImage
                : infoImage
            }
            style={[styles.iconStyle, { top: calculateTop() }]}
          />
        </TouchableOpacity>
        {creditAvailable ? (
          <PictureCredit
            credit={data.credit.toUpperCase()}
            style={styles.credit}
          />
        ) : (
            false
          )}
      </View>
    );
  } else {
    return false;
  }
}

const styles = {
  iconStyle: {
    position: 'absolute',
    width: layout.isMobile ? SIZES.FONT * 2 : SIZES.FONT * 3,
    height: layout.isMobile ? SIZES.FONT * 2 : SIZES.FONT * 3,
    right: 0,
    margin: SIZES.PADDING
  },
  credit: {
    marginHorizontal: SIZES.PaddingHorizontal,
    fontSize: SIZES.FONT,
    marginBottom: 5
  }
};

export default withNavigation(withTheme(ArticleBodyImages));
