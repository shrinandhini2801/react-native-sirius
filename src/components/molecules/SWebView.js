import React, { useState } from 'react';
import WebView from 'react-native-webview';
import { View, Platform, Linking } from 'react-native';
import { withTheme, Caption, Divider } from 'react-native-paper';
import { PADDING_BW_ITEMS, DeviceHeight, SIZES } from '@styles/sizes';
import { getJsInjectionStyle } from '@utils/WebViewUtils';
import { customFonts } from '@styles/customFonts';
import PictureCredit from '@atoms/PictureCredit';

const webViewHeightMap = {};
/**
 *
 * @param {theme, snippet, customStyle, isYouTube, caption} props
 * Common webview implemented for both the platforms - No need native integration for android to achieve scroll inside scroll anymore.
 * Forked the react-native-webview repo in https://github.com/SMG-Digital/react-native-webview and tailored the changes
 * needed for our project.
 *
 * DEV NOTES: The bridge files created for previous native module integration in android will be removed after thorough testing of this new implementation.
 */
function SWebView(props) {
  const { theme, snippet, customStyle, isYouTube, caption } = props;
  const [key, setkey] = useState(0);
  const [heightInState, setHeight] = useState(0);
  let webviewref = null;

  const jsForInjection = getJsInjectionStyle(props.theme);

  function onEmbedLinkPress(url) {
    Linking.openURL(url);
  }

  function interceptLoading(e) {
    onEmbedLinkPress(e.url);

    //TODO : do some testing for both platforms
    webviewref.stopLoading();
    // Update the state to re-render the WebView in case if the loading
    // was intercepted too late
    setkey(key + 1);
  }

  function getHash(input) {
    let hash = 0;
    let ch = 0;
    if (input) {
      for (let i = 0; i < input.length; i++) {
        ch = input.charCodeAt(i);
        hash = (hash << 5) - hash + ch; // eslint-disable-line no-bitwise
        hash &= hash; // eslint-disable-line no-bitwise
      }
    }
    return hash;
  }

  function onNavigationStateChangeL(e) {
    /**
     * Intercept loading requests within the WebView on iOS
     * if it is an actual url and it has not been handled yet.
     * It is to be handled on Android via the onShouldOverrideUrlLoading property
     */
    if (props.baseUrl) {
      if (e.url.indexOf(props.baseUrl) === -1 && /^https?:\/\/.*/.test(e.url)) {
        console.log('$$ yes intercepting');
        interceptLoading(e);
      }
    } else {
      if (/^https?:\/\/.*/.test(e.url)) {
        interceptLoading(e);
      }
    }

    // Update a WebView height when a new value is passed
    if (e.title) {
      let contentHeight = Number(e.title);
      if (contentHeight) {
        contentHeight = contentHeight <= 4000 ? contentHeight : 4000;
        if (contentHeight !== heightInState) {
          const hash = getHash(snippet);
          const height =
            heightInState === 0 && webViewHeightMap[hash]
              ? webViewHeightMap[hash]
              : contentHeight;
          webViewHeightMap[hash] = height;
          setHeight(height);
        }
      }
    }
  }

  const webViewProps = {
    ref: ref => {
      webviewref = ref;
    },
    source: { html: snippet, baseUrl: props.baseUrl ? props.baseUrl : '' },
    baseUrl: props.baseUrl ? props.baseUrl : '',
    style: [
      styles.content,
      customStyle,
      { height: customStyle.height ? customStyle.height : heightInState }
    ],
    decelerationRate: 'normal',
    domStorageEnabled: true,
    javaScriptEnabled: true,
    injectedJavaScript: jsForInjection,
    scalesPageToFit: Platform.OS === 'android',
    startInLoadingState: true,
    key: 'webView_' + key
  };

  function onShouldOverrideUrlLoading(e) {
    interceptLoading(e.nativeEvent);
  }

  return (
    <View style={{ width: '100%' }}>
      <WebView
        {...webViewProps}
        onNavigationStateChange={event => onNavigationStateChangeL(event)}
        onShouldOverrideUrlLoading={e => onShouldOverrideUrlLoading(e)}
        originWhitelist={['*']}
        allowsFullscreenVideo={props.allowsFullscreenVideo || true}
        scrollEnabled={true}
      />
      {isYouTube && caption !== '' ? (
        <PictureCredit credit={caption} style={styles.caption} />
      ) : (
        false
      )}
    </View>
  );
}

const styles = {
  content: {
    overflow: 'hidden',
    marginVertical: PADDING_BW_ITEMS / 4
  },
  caption: {
    marginHorizontal: SIZES.PaddingHorizontal,
    marginTop: -15,
    marginBottom: SIZES.BASE * 0.7,
    fontSize: SIZES.FONT
  }
};

export default withTheme(SWebView);
