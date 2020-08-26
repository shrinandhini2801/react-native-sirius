import * as React from 'react';
import HtmlView from 'react-native-htmlview';
import { Linking } from 'react-native';
import { withTheme } from 'react-native-paper';
import { customFonts } from '@styles/customFonts';
import { SIZES, PADDING_BW_ITEMS, getFontSize } from '@styles/sizes';
import InAppBrowser from 'react-native-inappbrowser-reborn';

function Paragraph(props) {
  let ParaFont = getFontSize(SIZES.PARA_FONTSIZE);
  let baseFont = getFontSize(SIZES.BASE);
  const styles = {
    container: {
      paddingHorizontal: SIZES.PaddingHorizontal
    },

    text: {
      fontFamily: customFonts.torstarTextRoman,
      fontSize: ParaFont,
      lineHeight: getFontSize(SIZES.LINE_HEIGHT)
    },

    em: {
      fontStyle: 'italic'
    },

    i: {
      fontStyle: 'italic'
    },

    u: {
      textDecorationLine: 'underline'
    },

    b: {
      fontWeight: '700'
    },

    strong: {
      fontWeight: '700'
    },

    h1: {
      fontWeight: '700',
      fontSize: ParaFont
    },

    h2: {
      fontWeight: '700',
      fontSize: ParaFont
    },

    h3: {
      fontWeight: '700',
      fontSize: ParaFont
    },

    a: {
      color: props.theme.colors.hyperLinks,
      textDecorationLine: props.theme.colors.hyperLinkStyle,
      // nested color style gets ignored on some android device, adding backgroundColor can solve the issue
      backgroundColor: 'transparent'
    },

    li: {
      flex: 1
    },

    bullet: {
      marginTop: 1,
      marginRight: 5,
      fontSize: ParaFont
    },

    sup: {
      fontSize: baseFont
    },

    p: {
      paddingBottom: PADDING_BW_ITEMS,
      fontSize: ParaFont
    }
  };
  const handleLinkPress = async url => {
    if (url.includes('mailto')) {
      Linking.openURL(url).catch(err => {
        console.log('Failed to open URL:', err.message);
      });
    } else {
      await InAppBrowser.open(url);
    }
  };

  return (
    <HtmlView
      value={props.data.text}
      stylesheet={styles}
      addLineBreaks={false}
      onLinkPress={url => handleLinkPress(url)}
      style={styles.container}
      textComponentProps={{
        style: [styles.text, { color: props.theme.colors.text }]
      }}
    />
  );
}

export default withTheme(Paragraph);
