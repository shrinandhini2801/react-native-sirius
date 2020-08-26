import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Viewport } from '@skele/components';
import {
  StyleSheet,
  RefreshControl,
  ScrollView,
  View,
  Text,
  Platform
} from 'react-native';
import { withTheme } from 'react-native-paper';
import LayoutOne from '@organisms/LayoutOne';
import LayoutThree from '@organisms/LayoutThree';
import LayoutFour from '@organisms/LayoutFour';
import LayoutFive from '@organisms/LayoutFive';
import { GetHomeAndSectionData } from '@services/API';
import HeaderBar from '@molecules/HeaderBar';
import AdPlaceHolder from '@atoms/AdPlaceHolder';
import CallToActionEmail from '@molecules/CallToActionEmail';
import { layout } from '@utils/Layout';
import { trackState } from '@utils/Analytics';
import { analytics } from '@rootConfig/build.config';
import { APP_INFO } from '@rootConfig/apiConfig';
import Loader from '@atoms/Loader';
import useDeviceOrientation from '@hooks/deviceOrientation';
import ConnectivityHOC from '@molecules/ConnectivityHOC';
import { useMappedState } from 'redux-react-hook';

const mappedState = state => ({
  selected_tab: state.sessionReducer.selected_tab
});

function NewsFeed(props) {
  const isMobile = layout.isMobile;
  const { colors } = props.theme;
  const [refreshing, setRefreshing] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [newsData, setNewsData] = useState({});
  const { selected_tab } = useMappedState(mappedState);
  const { path } = props;
  // Add context for ads
  const adsContext = path;
  function _onRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      fetchNewsFor(path);
      setRefreshing(false);
    }, 500);
  }

  const getLayoutNumber = section => {
    return !layout.isMobile && section.tabletLayoutType
      ? section.tabletLayoutType
      : section.layoutType;
  };

  /**
   * Dev Note : Layout Two has been removed and Layout one has been reused with just title color change.
   * So wherever the layout two has to be displayed , just use layout one with "blackTitle" param
   * @param {*} sectionNum - section number from AEM
   * @param {*} section - Actual data
   */

  function renderLayout(section) {
    let sectionNum = getLayoutNumber(section);
    switch (sectionNum) {
      case '1':
        return <LayoutOne section={section} />;
      case '2':
        return <LayoutOne section={section} blackTitle />;
      case '3':
        return <LayoutThree section={section} />;
      case '4':
        return <LayoutFour section={section} />;
      case '5':
        return <LayoutFive section={section} />;
      default:
        return <LayoutOne section={section} blackTitle />;
    }
  }

  function renderAd(pos, length) {
    if (length - pos > 1) {
      return <AdPlaceHolder adsContext={adsContext} />;
    }
    return false;
  }

  const { fromSections, isHome } = props;
  const deviceOrientation = useDeviceOrientation();
  function fetchNewsFor(path) {
    GetHomeAndSectionData(path)
      .then(jsonRes => {
        setNewsData(jsonRes);
        track(jsonRes);
        setLoadingData(false);
        return jsonRes;
      })
      .catch(err => {
        console.log(err);
      });
  }

  function track(data) {
    APP_INFO.trackState = {};
    APP_INFO.trackState.selectedCity = 'not-specified';
    APP_INFO.trackState.pageLocation = 'not-specified';
    APP_INFO.trackState.orientation = deviceOrientation;
    if (isHome) {
      APP_INFO.trackState.pageName = `${analytics.siteName}|home`;
      APP_INFO.trackState.channel = 'home';
      APP_INFO.trackState.pageURL = '/';
      APP_INFO.trackState.pageType = 'home';
      APP_INFO.trackState.pageTitle = 'home page';
      APP_INFO.trackState.testOrHier = 'home';
    } else {
      const sectionUrl = data.webAlias ? data.webAlias : path;
      APP_INFO.trackState.pageName = `${
        analytics.siteName
        }|section${sectionUrl.split('/').join('|')}`;
      APP_INFO.trackState.channel = sectionUrl
        .split('/')
        .join('|')
        .substring(1);
      APP_INFO.trackState.testOrHier = sectionUrl
        .split('/')
        .join('|')
        .substring(1);
      if (APP_INFO.trackState.testOrHier.split('|').length == 1) {
        APP_INFO.trackState.testOrHier =
          APP_INFO.trackState.testOrHier + '|none|none';
      } else if (APP_INFO.trackState.testOrHier.split('|').length == 2) {
        APP_INFO.trackState.testOrHier =
          APP_INFO.trackState.testOrHier + '|none';
      }
      APP_INFO.trackState.pageURL = sectionUrl;
      APP_INFO.trackState.pageType = 'section';
      APP_INFO.trackState.subPageType = 'section';
      APP_INFO.trackState.pageTitle =
        APP_INFO.trackState.testOrHier.split('|')[0] + ' stories';
    }
    trackState();
  }

  useFocusEffect(
    React.useCallback(() => {
      if ((props.routeIndex === selected_tab || fromSections)) {
        if (loadingData) {
          fetchNewsFor(props.path);
        }
        else {
          track(newsData);
        }
      }
    }, [props.path, selected_tab])
  );

  let sectionCounter = -1;

  const NEWS = (
    <Viewport.Tracker>
      <ScrollView
        removeClippedSubviews={Platform.OS === 'android'}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={[styles.container, { backgroundColor: colors.background }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={_onRefresh}
            title="Getting news"
            enabled={true}
          />
        }>
        {newsData && newsData.items && (
          <View>
            {newsData.items.map((section, index) => {
              // Some sections are returned as null and thus not rendered.
              // Using the indexes from the array throws off the ad placements
              // So sectionCounter keeps track of rendered sections

              // Case 0, 2, 5, 8 are ad placeholder
              if (section && section.assets) {
                sectionCounter += 1;
                switch (sectionCounter) {
                  case 0:
                  case 2:
                  case 5:
                  case 8:
                    return (
                      <View key={`${index}`}>
                        {renderLayout(section)}
                        {(props.routeIndex === selected_tab || fromSections) &&
                          renderAd(index, newsData.items.length)}
                      </View>
                    );
                  default:
                    return (
                      <View key={`${index}`}>{renderLayout(section)}</View>
                    );
                }
              } else {
                console.log('No section found');
                return null;
              }
            })}
            <CallToActionEmail page={isHome ? 'home' : 'section'} />
          </View>
        )}
      </ScrollView>
    </Viewport.Tracker>
  );
  let getData = () => {
    if (loadingData) {
      return <Loader />;
    } else {
      return fromSections ? (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <HeaderBar />
          {NEWS}
        </View>
      ) : (
          NEWS
        );
    }
  };

  return <ConnectivityHOC>{getData()}</ConnectivityHOC>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topPadding48: {
    paddingTop: 48
  }
});

export default withTheme(NewsFeed);
