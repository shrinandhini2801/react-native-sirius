import React, { useState } from 'react';
import { ENVIRONMENT } from '@rootConfig/apiConfig';
import { Viewport } from '@skele/components';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';
import { black, white } from '@styles/colors';
import {
  SIZES,
  AD_HEIGHT,
  TABLET_AD_HEIGHT,
  PADDING_BW_ITEMS
} from '@styles/sizes';
import { customFonts } from '@styles/customFonts';
import { localStrings } from '@utils/i18n';
import { PublisherBanner } from 'react-native-admob';
import { withNavigation } from '@react-navigation/compat';
import { adProperty } from '@rootConfig/build.config';
import { layout } from '@utils/Layout';
//TODO: Transport to context
function AdPlaceHolder(props) {
  const { theme, style } = props;
  const [adLoaded, setAdLoaded] = useState(false);
  const [isInViewPort, setIsInViewPort] = useState(false);
  let adsContext = props.adsContext;
  const adSize =
    layout.isMobile || props.isArticle ? 'mediumRectangle' : 'leaderboard';
  const adStyle =
    layout.isMobile || props.isArticle
      ? styles.mainContainer
      : styles.mainTabletContainer;
  const environment = ENVIRONMENT == 'dev' ? 'staging' : 'prod';
  const ViewPortAwareView = Viewport.Aware(View);
  if (adsContext === '/home') {
    adsContext = '/homepage';
  }
  const assetTags = props.assetTags ? props.assetTags : null;
  const storyuuid = props.storyuuid ? props.storyuuid : null;
  const customTargeting = {
    cutpoint: ['small', 'app'],
    environment: [environment]
  };
  if (assetTags) {
    customTargeting.kvng = assetTags;
  }
  if (storyuuid) {
    customTargeting.assetid = [storyuuid];
  }
  const showAd = () => {
    return isInViewPort ? (
      <PublisherBanner
        adSize={adSize}
        validAdSizes={[adSize]}
        adUnitID={`${adProperty.slice(0, -1)}${adsContext}`}
        testDevices={[PublisherBanner.simulatorId]}
        customTargeting={customTargeting}
        didFailToReceiveAdWithError={e =>
          console.log('Banner:onAdFailedToLoad', e)
        }
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={e => console.log('Banner:onAdFailedToLoad', e)}
        onAdOpened={() => console.log('Banner:onAdOpened')}
        onAdClosed={() => console.log('Banner:onAdClosed')}
        onAdLeftApplication={() => console.log('Banner:onAdLeftApplication')}
        onAppEvent={event => console.log('Banner:onAppEvent', event)}
      />
    ) : (
        false
      );
  };

  return (
    <View
      style={[
        style,
        adLoaded ? adStyle : styles.mainContainerCollapsed,
        {
          borderColor: theme.dark ? black : theme.colors.disabled,
          backgroundColor: theme.colors.adBox,
          marginTop: SIZES.PADDING
        }
      ]}>
      <ViewPortAwareView
        retainOnceInViewport={true}
        onViewportEnter={() => setIsInViewPort(true)}
        onViewportLeave={() => console.log('Ad exit')}>
        <Text style={[styles.adTitle, { color: theme.colors.text }]}>
          {props.isArticle
            ? localStrings('articleContinues')
            : localStrings('ad')}
        </Text>
        {showAd()}
      </ViewPortAwareView>
    </View>
  );
}

const styles = {
  mainContainer: {
    flex: 1,
    height: AD_HEIGHT,
    borderWidth: 0.5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainTabletContainer: {
    flex: 1,
    height: TABLET_AD_HEIGHT,
    borderWidth: 0.5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainerCollapsed: {
    display: 'none'
  },
  adContainer: {
    height: '75%',
    marginVertical: 10,
    marginHorizontal: '12%'
  },
  adTitle: {
    fontSize: SIZES.MINIFONT,
    marginTop: -10,
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: customFonts.merriweatherSansRegular
  }
};

export default withTheme(withNavigation(AdPlaceHolder));
