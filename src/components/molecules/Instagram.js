import React, { useEffect, useState } from 'react';
import { GetFromURL } from '@services/API';
import SWebView from '@molecules/SWebView';
import {
  DeviceHeight,
  SIZES,
  PADDING_BW_ITEMS,
  DeviceWidth
} from '@styles/sizes';
import { withTheme } from 'react-native-paper';
import { getHtmlWrapper } from '@utils/WebViewUtils';
import { layout } from '@utils/Layout';

function Instagram(props) {
  const { hideCaption, onLinkPress, postUrl } = props;

  const [snippet, setSnippet] = useState(null);

  useEffect(() => {
    getHtmlData();
  }, []);

  function getHtmlData() {
    if (postUrl) {
      const apiString =
        'https://api.instagram.com/oembed?omitscript=false&hidecaption=' +
        hideCaption +
        '&url=' +
        postUrl;
      GetFromURL(apiString).then(response => {
        if (response.data) {
          let height = encodeURIComponent(600);
          let width = layout.isMobile ? 250 : 500
          setSnippet(
            response.data.html +
            `<style>iframe {box-sizing: border-box; max-width: 100% !important; min-width:${width}px !important;width:${layout.width}px; height:${height}px;}</style>` +
            `<script>window.instgrm.Embeds.process();</script>`
          );
        }
      });
    }
  }

  if (snippet) {
    return (
      <SWebView
        baseUrl={'https://www.instagram.com/p/'}
        customStyle={{
          height: DeviceHeight * 0.5,
          maxHeight: DeviceHeight * 0.5,
          marginHorizontal: SIZES.PaddingHorizontal,
          marginBottom: SIZES.MARGIN * 2
        }}
        snippet={getHtmlWrapper(snippet)}
      />
    );
  } else {
    return false;
  }
}

export default withTheme(Instagram);
