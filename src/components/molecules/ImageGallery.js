import React, { useState } from 'react';
import { withTheme, Text } from 'react-native-paper';
import { withNavigation } from '@react-navigation/compat';
import { customFonts } from '@styles/customFonts';
import {
  Modal,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  Platform
} from 'react-native';
import { SIZES, DeviceWidth, DeviceHeight } from '@styles/sizes';
import { AEM_ENDPOINT } from '@rootConfig/apiConfig';
import { TYPES } from '@services/ArticleBodyTypes';
import SArticle from '@atoms/SArticle';
import ImageViewer from 'react-native-image-zoom-viewer';
import GetIcon from '@atoms/GetIcon';

function ImageGallery(props) {
  const { colors } = props.theme;
  const { data, navigation, isMainart } = props;
  let gallImages = [];
  /**This is to handle mainart logics */
  if (isMainart && data && data.length > 0) {
    let images = [];
    let t = data.filter(component => component.type === TYPES.SLIDESHOW);
    images = t.length > 0 && t[0].images;
    gallImages =
      images.length > 0
        ? images.map(item => {
            item['url'] = item['url'].startsWith(AEM_ENDPOINT)
              ? item['url']
              : `${AEM_ENDPOINT}${item['url']}`;
            return item;
          })
        : [];
  } else {
    /**This is to handle article body logics */
    gallImages = [];
    if (data.type === TYPES.GENERICIMAGE || data.type === TYPES.IMAGE) {
      data.url = data.url.startsWith(AEM_ENDPOINT)
        ? data.url
        : `${AEM_ENDPOINT}${data.url}`;
      gallImages.push(data);
    } else if (data.type === TYPES.SLIDESHOW) {
      gallImages =
        data.images.length > 0
          ? data.images.map(item => {
              item['url'] = item['url'].startsWith(AEM_ENDPOINT)
                ? item['url']
                : `${AEM_ENDPOINT}${item['url']}`;
              return item;
            })
          : [];
    }
  }

  function getHeader() {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeContainer}>
        <GetIcon isMaterial name={'close'} size={45} color={'white'} />
      </TouchableOpacity>
    );
  }

  function createCredit(obj) {
    let credit = '';
    if (obj && obj.credit && obj.credit.trim() !== '') {
      credit = credit + obj.credit;
    }
    if (obj && obj.source && obj.source.trim() !== '') {
      credit =
        credit.trim() !== ''
          ? credit + ' / ' + obj.source
          : credit + obj.source;
    }

    return credit.trim() !== '' ? ' (' + credit.toUpperCase() + ')' : '';
  }

  function getFooter(index) {
    let caption =
      gallImages[index] && gallImages[index].caption
        ? gallImages[index].caption
        : '';
    let credit = createCredit(gallImages[index]);

    let numbering =
      gallImages.length > 1 ? index + 1 + ' of ' + gallImages.length : '';
    return credit.trim() === '' &&
      caption.trim() === '' &&
      numbering.trim() === '' ? (
      false
    ) : (
      <SafeAreaView style={styles.footer}>
        <Text style={styles.numbering}>{numbering}</Text>
        <SArticle
          color={colors.whiteText}
          title={`${caption}${credit}`}
          avoidTextScaling
        />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      {getHeader()}
      <SafeAreaView style={{ flex: 1 }}>
        <ImageViewer
          loadingRender={() => (
            <ActivityIndicator size={'large'} color={'white'} />
          )}
          failImageSource={() => console.log('image load failed')}
          flipThreshold={0}
          style={styles.gallStyle}
          imageUrls={gallImages}
          backgroundColor={'black'}
          renderIndicator={() => false}
          renderFooter={index => getFooter(index)}
          footerContainerStyle={{
            position: 'absolute',
            bottom: 0,
            zIndex: 9999,
            marginBottom: Platform.OS === 'ios' ? 50 : 30
          }}
          saveToLocalByLongPress={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = {
  modalStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 25
  },
  gallStyle: {
    height: DeviceHeight,
    width: DeviceWidth
  },
  footer: {
    width: DeviceWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: SIZES.PADDING,
    paddingBottom: 20
  },

  closeContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 50,
    width: '100%',
    marginLeft: 5,
    paddingTop: 10
  },
  numbering: {
    fontFamily: customFonts.torstarDecSemiBold,
    color: 'white',
    textAlign: 'center'
  }
};
export default withNavigation(withTheme(ImageGallery));
