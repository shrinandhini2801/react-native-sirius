import React from 'react';
import Image from '@atoms/Image';
import {
  View,
  Animated,
  TouchableOpacity,
  Image as RNIMAGE
} from 'react-native';
import { AEM_ENDPOINT } from '@rootConfig/apiConfig';
import SWebView from '@molecules/SWebView';
import { getSnippet } from '@molecules/Snippets';
import { TYPES } from '@services/ArticleBodyTypes';
import { DeviceWidth, SIZES } from '@styles/sizes';
import { getHtmlWrapper } from '@utils/WebViewUtils';
import { layout } from '@utils/Layout';

const gallImage = require('../../../react/images/gallery.png');
const infoImage = require('../../../react/images/infoIcon.png');

let youtubeVideos,
  brightcoveVideos,
  slideshows,
  html5MobileAssets,
  images = null;

let heroAsset = null;
let secondaryAsset = null;
let tertiaryAsset = null;

export function isMainartAvailable(data) {
  if (data.mainart && data.mainart.length > 0) {
    youtubeVideos = data.mainart.filter(
      component => component.type === TYPES.YOUTUBE
    );
    brightcoveVideos = data.mainart.filter(
      component => component.type === TYPES.VIDEO
    );
    slideshows = data.mainart.filter(
      component => component.type === TYPES.SLIDESHOW
    );
    html5MobileAssets = data.mainart.filter(
      component => component.type === TYPES.HTML5MOBILE
    );
    images = data.mainart.filter(component => component.type === TYPES.IMAGE);

    if (html5MobileAssets.length > 0) {
      return { status: true, type: TYPES.HTML5MOBILE };
    } else if (youtubeVideos.length > 0 && youtubeVideos[0].youtubeid) {
      return { status: true, type: TYPES.YOUTUBE };
    } else if (brightcoveVideos.length > 0) {
      return { status: true, type: TYPES.VIDEO };
    } else if (slideshows.length > 0 && slideshows[0].images) {
      return { status: true, type: TYPES.SLIDESHOW };
    } else if (images.length > 0) {
      return { status: true, type: TYPES.IMAGE };
    } else {
      return { status: false, type: null };
    }
  } else {
    return { status: false, type: null };
  }
}

/**
 * Construct the proper URL with AEM end point
 * @param {any} url
 */
function getProperURL(url) {
  return url.startsWith(AEM_ENDPOINT) ? url : `${AEM_ENDPOINT}${url}`;
}

/**
 * Utility function to correctly detect empty objects
 */
function isEmpty(obj) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (Object.prototype.hasOwnProperty.call(obj, keys[i])) {
      return false;
    }
  }
  return true;
}

function executeSecondaryMainArtLogic(data, props) {
  /**Creating secondary assets in article body */
  let temp = data.mainart;
  let indexHero = heroAsset && heroAsset[0] ? temp.indexOf(heroAsset[0]) : -1;
  let filteredArray = temp.filter(function(value, index, arr) {
    return index != indexHero;
  });

  /**
   * Prioritising the type of components before adding
   */
  if (temp.length > 0) {
    if (
      heroAsset[0] &&
      heroAsset[0].type !== TYPES.YOUTUBE &&
      youtubeVideos.length > 0
    ) {
      secondaryAsset = youtubeVideos[0];
    } else if (
      heroAsset[0].type !== TYPES.VIDEO &&
      brightcoveVideos.length > 0
    ) {
      secondaryAsset = brightcoveVideos[0];
    } else if (
      heroAsset[0].type !== TYPES.SLIDESHOW &&
      slideshows.length > 0 &&
      slideshows[0].images
    ) {
      secondaryAsset = slideshows[0];
    } else if (
      heroAsset[0].type !== TYPES.IMAGE &&
      images.length > 0 &&
      images[0].url
    ) {
      secondaryAsset = images[0];
    } else {
      temp.shift();
    }
  } else {
    secondaryAsset = null;
  }
  /**
   * Returning the secondary main art component
   */
  if (secondaryAsset && !isEmpty(secondaryAsset)) {
    if (secondaryAsset.type === TYPES.SLIDESHOW && secondaryAsset.images) {
      //Check if hero asset image is same as that of secondary image if so Ignore
      if (
        heroAsset &&
        heroAsset.length > 0 &&
        heroAsset[0] &&
        heroAsset[0].type === TYPES.IMAGE &&
        heroAsset[0].url
      ) {
        if (
          secondaryAsset.images[0].url &&
          getProperURL(secondaryAsset.images[0].url) !==
            getProperURL(heroAsset[0].url)
        ) {
          props.loadSecondaryAsset(secondaryAsset);
        }
      } else {
        props.loadSecondaryAsset(secondaryAsset);
      }
    } else if (secondaryAsset.type !== TYPES.SLIDESHOW) {
      props.loadSecondaryAsset(secondaryAsset);
    }
  }

  //TODO : When TERTIARY ASSET COMES INTO PICTURE
  /** creating tertiary assets */

  // if (tempMainart.length > 0) {
  //   if (slideshows.length > 0) {
  //     tertiaryAsset = slideshows.shift();
  //   } else if (heroAsset.type !== 'slideshow') {
  //     tertiaryAsset = tempMainart.shift();
  //   } else {
  //     tempMainart.shift();
  //   }
  //   if (!isEmpty(tertiaryAsset)) {
  //     tempMainart.splice(tempMainart.indexOf(tertiaryAsset), 1);
  //   }
  // }
}

export function MainArt(props) {
  const { data, style, onPress } = props;
  let URL = null;
  let isGallery = false;

  if (isMainartAvailable(data)) {
    /**
     * If mainart is a html5snippet
     */
    if (
      html5MobileAssets.length > 0 &&
      html5MobileAssets[0].snippet.trim() !== ''
    ) {
      heroAsset = html5MobileAssets;
      executeSecondaryMainArtLogic(data, props);
      let styleCustom =
        Platform.OS === 'ios'
          ? {
              maxWidth: DeviceWidth,
              marginHorizontal: SIZES.PaddingHorizontal
            }
          : {
              marginHorizontal: SIZES.PaddingHorizontal
            };
      return (
        <SWebView
          customStyle={styleCustom}
          snippet={getHtmlWrapper(html5MobileAssets[0].snippet)}
        />
      );
    } else if (
      /**
       * If mainart is a youtube video
       */
      youtubeVideos.length > 0 &&
      (youtubeVideos[0].youtubeid !== undefined ||
        youtubeVideos[0].youtubeid !== null)
    ) {
      heroAsset = youtubeVideos;
      executeSecondaryMainArtLogic(data, props);
      return (
        <SWebView
          isYouTube
          caption={
            youtubeVideos[0].description ? youtubeVideos[0].description : ''
          }
          customStyle={{
            height: style.height,
            // maxHeight: MAINART_MAX_HEIGHT,
            width: DeviceWidth
          }}
          snippet={getSnippet(
            {
              type: youtubeVideos[0].type,
              id: youtubeVideos[0].youtubeid
            },
            true
          )}
        />
      );
    } else {
      /**
       * Deciding whether or not to show the gallery icon
       */
      isGallery =
        slideshows.length > 0 && slideshows[0].images.length > 1 ? true : false;

      let tmpUrl = null;
      if (images.length > 0 && images[0].url) {
        /**Image mainart */
        tmpUrl = images[0].url ? images[0].url : null;
        heroAsset = images;
      } else if (slideshows.length > 0 && slideshows[0].images[0]) {
        /**
         * If there is no image main art , check if there is a slideshow and show the first image as mainart.
         */
        tmpUrl = slideshows[0].images[0].url
          ? slideshows[0].images[0].url
          : null;
        heroAsset = slideshows;
      } else {
        tmpUrl = null;
      }
      URL = tmpUrl ? getProperURL(tmpUrl) : null;
      executeSecondaryMainArtLogic(data, props);

      return URL ? (
        <Animated.View style={[style]}>
          <TouchableOpacity onPress={() => onPress()} activeOpacity={2}>
            <Image
              url={URL}
              borderRadius={1}
              style={{ height: style.height }}
            />
            <RNIMAGE
              source={isGallery ? gallImage : infoImage}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        false
      );
    }
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
  }
};
