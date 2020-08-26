import * as React from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { SIZES, DeviceHeight, DeviceWidth } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';
import { getSnippet } from '@molecules/Snippets';
import { getJsInjectionStyle } from '@utils/WebViewUtils';
import HeaderBar from '@molecules/HeaderBar';
/**
 *
 * This molecule renders all the components that needs to be opened in IN APP BROWSER
 */
function InAppBrowser(props) {
  const { data, isEmbed, isScalesPageToFit } = props;
  let snippet = getSnippet(data, true);

  //TODO:
  const jsForInjection = getJsInjectionStyle(props.theme);

  const topPositionFactor = Platform.OS === 'ios' ? 20 : 0;
  const styleBox = {
    height: DeviceHeight, //- topPositionFactor-35,
    width: DeviceWidth
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar />
      <WebView
        style={[styles.webView, styleBox]}
        key="browser"
        source={snippet.source}
        javaScriptEnabled={true}
        decelerationRate="normal"
        scalesPageToFit={false}
        domStorageEnabled={true}
        injectedJavaScript={jsForInjection}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={props.theme.colors.loader} />
          </View>
        )}
        originWhitelist={['*']}
        useWebKit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  webView: {
    flex: 1
  },

  loading: {
    alignItems: 'center',
    flex: 1
  }
});

export default withTheme(InAppBrowser);
