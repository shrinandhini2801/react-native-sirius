import * as React from 'react';
import Paragraph from '@atoms/Paragraph';
import { Platform, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import AdPlaceHolder from '@atoms/AdPlaceHolder';
import ArticleBodyImages from '@molecules/ArticleBodyImages';
import SWebView from '@molecules/SWebView';
import { getSnippet } from '@molecules/Snippets';
import { localStrings } from '@utils/i18n';
import {
  MAINART_MAX_HEIGHT,
  DeviceWidth,
  DeviceHeight,
  SIZES,
  PADDING_BW_ITEMS
} from '@styles/sizes';
import RenderIABLink from '@atoms/RenderIABLink';
import { getHtmlWrapper } from '@utils/WebViewUtils';
import { TYPES } from '@services/ArticleBodyTypes';
import Instagram from '@molecules/Instagram';
import { layout } from '@utils/Layout';

//TODO: Add rest of the components in body

function ArticleBody(props) {
  const { data, secondary } = props;
  const adsContext = data.breadcrumbs[data.breadcrumbs.length - 1].relurl
    ? data.breadcrumbs[data.breadcrumbs.length - 1].relurl
    : data.breadcrumbs[data.breadcrumbs.length - 1].url;
  /**
   * Adding the secondary assets to the body of the article based on the logic
   * articles 11 paragraphs or fewer: show below last paragraph
   * articles 12 paragraphs or greater: show below paragraph 10
   */
  if (secondary !== null && secondary !== undefined) {
    secondary.isSecondary = true;
    if (data.body.length <= 11) {
      //show below last paragraph
      data.body.push(secondary);
    } else if (data.body.length > 12) {
      //show below 10th paragraph
      data.body.splice(9, 0, secondary);
    }
  }

  let renderItems = [];
  if (data.body) {
    data.body.map((items, index) => {
      switch (items.type) {
        case TYPES.TEXT:
          renderItems.push(<Paragraph data={items} key={`${index}`} />);
          break;
        case TYPES.IMAGE:
          renderItems.push(
            <ArticleBodyImages
              data={items}
              key={`${index}`}
              isSecondary={items.isSecondary ? items.isSecondary : false}
              isMainart={false}
            />
          );
          break;
        case TYPES.SLIDESHOW:
          renderItems.push(
            <ArticleBodyImages
              data={items}
              key={`${index}`}
              isSecondary={items.isSecondary ? items.isSecondary : false}
              isMainart={false}
            />
          );
          break;
        case TYPES.GENERICIMAGE:
          renderItems.push(
            <ArticleBodyImages
              data={items}
              key={`${index}`}
              isMainart={false}
            />
          );
          break;
        case TYPES.YOUTUBE: {
          if (items.youtubeid !== undefined && items.youtubeid !== null) {
            let sni = getSnippet(
              {
                type: items.type,
                id: items.youtubeid
              },
              true
            );
            renderItems.push(
              <SWebView
                isYouTube
                caption={items.description ? items.description : ''}
                customStyle={{
                  //height: MAINART_MAX_HEIGHT,
                  maxHeight: MAINART_MAX_HEIGHT,
                  width: DeviceWidth,
                  marginBottom: PADDING_BW_ITEMS
                }}
                snippet={sni}
                key={`${index}`}
              />
            );
          }
          break;
        }
        case TYPES.POLL: {
          renderItems.push(
            <RenderIABLink
              data={items}
              title={localStrings('poll.title')}
              iconName={
                Platform.OS === 'ios'
                  ? 'ios-checkmark-circle-outline'
                  : 'md-checkmark-circle-outline'
              }
              key={`${index}`}
            />
          );
          break;
        }
        case TYPES.SAM: {
          if (items.embedid !== undefined && items.embedid !== null) {
            let sni = getSnippet(
              {
                type: items.type,
                id: items.embedid
              },
              true
            );
            renderItems.push(
              <View style={styles.samContainer} key={`${index}`}>
                <SWebView
                  customStyle={{
                    height: layout.isMobile
                      ? DeviceHeight * 0.5
                      : DeviceHeight * 0.4,
                    maxHeight: DeviceHeight * 0.6
                  }}
                  snippet={sni}
                />
              </View>
            );
          }
          break;
        }
        case TYPES.SCRIBD: {
          renderItems.push(
            <RenderIABLink
              data={items}
              title={localStrings('scribd.title')}
              iconName={Platform.OS === 'ios' ? 'ios-document' : 'md-document'}
              key={`${index}`}
            />
          );
          break;
        }
        case TYPES.TWITTER_TWEET: {
          if (items.id !== undefined && items.id !== null) {
            let styleCustom = {
              height: layout.isMobile ? DeviceHeight * 0.5 : DeviceHeight * 0.5,
              maxHeight: DeviceHeight * 0.7,
              marginHorizontal: layout.isMobile ? SIZES.PaddingHorizontal : 0,
              marginBottom: SIZES.PADDING * 2
            };
            let sni = getSnippet(
              {
                type: items.type,
                id: items.id
              },
              true
            );
            renderItems.push(
              <SWebView
                allowsFullscreenVideo={false}
                customStyle={styleCustom}
                baseUrl={'https://twitter.com/'}
                snippet={sni}
                key={`${index}`}
              />
            );
          }
          break;
        }
        case TYPES.TWITTER: {
          if (items.widgetid !== undefined && items.widgetid !== null) {
            let sni = getSnippet(
              {
                type: items.type,
                id: items.widgetid,
                height: items.widgetheight
              },
              true
            );
            renderItems.push(
              <SWebView
                baseUrl={'https://twitter.com/'}
                customStyle={{
                  // height: layout.isMobile ? DeviceHeight * 0.6 : DeviceHeight * 0.5,
                  maxHeight: DeviceHeight * 0.8,
                  marginHorizontal: SIZES.PaddingHorizontal,
                  marginBottom: layout.isMobile
                    ? SIZES.PADDING
                    : SIZES.PADDING * 2
                }}
                snippet={sni}
                key={`${index}`}
              />
            );
          }
          break;
        }
        case TYPES.HTML5MOBILE: {
          if (
            items.snippet !== undefined &&
            items.snippet !== null &&
            items.snippet.trim() !== ''
          ) {
            let styleCustom = {
              maxWidth: DeviceWidth,
              marginHorizontal: SIZES.PaddingHorizontal,
              marginBottom: SIZES.FONT * 2
            };
            let sni = getHtmlWrapper(items.snippet);
            renderItems.push(
              <SWebView
                customStyle={styleCustom}
                snippet={sni}
                key={`${index}`}
              />
            );
          }
          break;
        }
        case TYPES.FBPOST: {
          if (items.fbposturl !== undefined && items.fbposturl !== null) {
            let sni = getSnippet(
              {
                type: items.type,
                postUrl: items.fbposturl
              },
              true
            );
            renderItems.push(
              <SWebView
                baseUrl={'https://www.facebook.com/'}
                customStyle={{
                  width: DeviceWidth,
                  marginHorizontal: SIZES.PaddingHorizontal,
                  height: layout.isMobile ? 400 : 500,
                  marginBottom: layout.isMobile
                    ? SIZES.PADDING
                    : SIZES.PADDING * 2
                }}
                snippet={sni}
                key={`${index}`}
              />
            );
          }
          break;
        }
        case TYPES.INSTAGRAM: {
          renderItems.push(
            <Instagram
              postUrl={items.url}
              hideCaption={false}
              key={`${index}`}
            />
          );
          break;
        }
        case TYPES.USTREAM: {
          renderItems.push(
            <RenderIABLink
              data={items}
              title={localStrings('ustream.title')}
              iconName={Platform.OS === 'ios' ? 'ios-videocam' : 'md-videocam'}
              key={`${index}`}
            />
          );
          break;
        }

        default:
          console.log('Default');
          break;
      }

      /**Ad logic */
      if (
        (index == 2 && data.body.length >= 6) ||
        (index == 11 && data.body.length >= 14) ||
        (index == 23 && data.body.length >= 26)
      ) {
        let assetTags = [];

        if (data.keywords) {
          for (keyword of data.keywords) {
            if (keyword.lastIndexOf('ng:') > -1) {
              assetTags.push(
                `${keyword.substring(keyword.lastIndexOf('/') + 1)}`
              );
            }
          }
        }
        renderItems.push(
          <View style={styles.adPadding}>
            <AdPlaceHolder
              key={`Ad-${index}`}
              adsContext={adsContext}
              isArticle={true}
              storyuuid={data.storyuuid}
              assetTags={assetTags}
            />
          </View>
        );
      }
    });
  }

  return renderItems;
}

const styles = {
  samContainer: {
    paddingHorizontal: SIZES.PaddingHorizontal,
    overflow: 'scroll',
    maxHeight: DeviceHeight * 0.6,
    marginBottom: 20
  },
  adPadding: {
    paddingBottom: 32
  }
};

export default withTheme(ArticleBody);
