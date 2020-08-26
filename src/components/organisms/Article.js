import React, { useState, useEffect } from 'react';
import { Viewport } from '@skele/components';
import {
  RefreshControl,
  ScrollView,
  View,
  Animated,
  Easing
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { withNavigation } from '@react-navigation/compat';
import { GetArticleData } from '@services/API';
import ArticleHeader from '@molecules/ArticleHeader';
import ArticleBody from '@molecules/ArticleBody';
import AuthorByline from '@atoms/AuthorByline';
import { MainArt, isMainartAvailable } from '@atoms/MainArt';
import HeaderBar from '@molecules/HeaderBar';
import { SIZES, MAINART_MAX_HEIGHT, MAINART_MIN_HEIGHT } from '@styles/sizes';
import { TYPES } from '@services/ArticleBodyTypes';
import ImageGallery from '@molecules/ImageGallery';
import { trackState } from '@utils/Analytics';
import CallToActionEmail from '@molecules/CallToActionEmail';
import useDeviceOrientation from '@hooks/deviceOrientation';
import Disclaimer from '@atoms/Disclaimer';
import Loader from '@atoms/Loader';
import { layout } from '@utils/Layout';
import { APP_INFO } from '@rootConfig/apiConfig';
import { analytics } from '@rootConfig/build.config';
import ConnectivityHOC from '@molecules/ConnectivityHOC';
import { formatDateforArticleAnalytics } from '@utils/formatDate';

function Article(props) {
  const isMobile = layout.isMobile;
  const [refreshing, setRefreshing] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [articleData, setArticleData] = useState({});
  const [secondaryAsset, setsecondaryAsset] = useState(null);
  const { articleUrl, storyuuid, navigation } = props;
  const { colors } = props.theme;
  const [scrollY] = useState(new Animated.Value(0));
  const MAINART_SCROLL_DISTANCE = MAINART_MAX_HEIGHT - MAINART_MIN_HEIGHT;
  let slideShowImage = null;
  function _onRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  useEffect(() => {
    fetchArticle();
  }, []);

  // FIXME: this only for home and for testing
  async function fetchArticle() {
    let dataURL = articleUrl.substring(0, articleUrl.length - 5);
    return GetArticleData(dataURL, storyuuid)
      .then(jsonRes => {
        if (jsonRes) {
          buildTrackState(jsonRes);
          trackState();
          setArticleData(jsonRes);
          setLoadingData(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function parseBreadCrumbs(crumb) {
    return crumb.split(' ').join('_');
  }

  function buildTrackState(jsonRes) {
    if (jsonRes) {
      const deviceOrientation = useDeviceOrientation();

      APP_INFO.trackState = {};
      APP_INFO.trackState.pageURL = jsonRes.canonicalUrl.replace(
        /https?:\/\/[^\/]+/i,
        ''
      );
      const alias = APP_INFO.trackState.pageURL
        .substring(APP_INFO.trackState.pageURL.lastIndexOf('/') + 1)
        .replace('.html', '')
        .toLowerCase();

      APP_INFO.trackState.pageName = `${analytics.siteName}|${jsonRes.type}|${
        jsonRes.breadcrumbs[0]
          ? parseBreadCrumbs(jsonRes.breadcrumbs[0].label)
          : 'none'
        }|${
        jsonRes.breadcrumbs[1]
          ? parseBreadCrumbs(jsonRes.breadcrumbs[1].label)
          : 'none'
        }|${
        jsonRes.breadcrumbs[2]
          ? parseBreadCrumbs(jsonRes.breadcrumbs[2].label)
          : 'none'
        }|${jsonRes.storyuuid}-${alias}`;
      APP_INFO.trackState.pageName = APP_INFO.trackState.pageName.toLowerCase();
      APP_INFO.trackState.channel = `${
        jsonRes.breadcrumbs[0]
          ? jsonRes.breadcrumbs[0].label.replace(' ', '_').toLowerCase()
          : ''
        }${
        jsonRes.breadcrumbs[1]
          ? '|' + jsonRes.breadcrumbs[1].label.replace(' ', '_').toLowerCase()
          : ''
        } ${
        jsonRes.breadcrumbs[2]
          ? '|' + jsonRes.breadcrumbs[2].label.replace(' ', '_').toLowerCase()
          : ''
        }`.trim();

      APP_INFO.trackState.testOrHier = `${
        jsonRes.breadcrumbs[0]
          ? jsonRes.breadcrumbs[0].label.replace(' ', '_').toLowerCase()
          : 'none'
        }|${
        jsonRes.breadcrumbs[1]
          ? jsonRes.breadcrumbs[1].label.replace(' ', '_').toLowerCase()
          : 'none'
        }|${
        jsonRes.breadcrumbs[2]
          ? jsonRes.breadcrumbs[2].label.replace(' ', '_').toLowerCase()
          : 'none'
        }`.trim();

      let pubDate = jsonRes.publisheddate.split(' ');
      pubDate.unshift(pubDate.pop());
      APP_INFO.trackState.contentHier = `${pubDate.join('|')}|${alias}`;
      APP_INFO.trackState.siteName = analytics.siteName;
      APP_INFO.trackState.pageType = 'article';
      APP_INFO.trackState.subPageType = jsonRes.type.toLowerCase();
      APP_INFO.trackState.pageTitle = jsonRes.headline.toLowerCase();
      APP_INFO.trackState.pageLocation = 'not-specified';
      APP_INFO.trackState.selectedCity = 'not-specified';
      APP_INFO.trackState.storyUUID = jsonRes.storyuuid;
      APP_INFO.trackState.adId = jsonRes.adId;
      APP_INFO.trackState.sponsorName = jsonRes.sponsorname;
      APP_INFO.trackState.alias = alias;

      APP_INFO.trackState.authors = [];
      APP_INFO.trackState.credits = [];

      if (jsonRes.authors) {
        for (author of jsonRes.authors) {
          author.author &&
            APP_INFO.trackState.authors.push(author.author.toLowerCase());
          author.credit &&
            APP_INFO.trackState.credits.push(author.credit.toLowerCase());
        }
      }

      APP_INFO.trackState.pubDate = formatDateforArticleAnalytics(
        jsonRes.publishedepoch
      ).toLowerCase();

      APP_INFO.trackState.primaryPublication = analytics.siteName;

      APP_INFO.trackState.orientation = deviceOrientation;

      APP_INFO.trackState['&&pageName'] = APP_INFO.trackState.pageName;

      APP_INFO.trackState['&&products'] = '';

      if (jsonRes.assetTags) {
        for (tag of jsonRes.assetTags) {
          APP_INFO.trackState['&&products'] += `tags;${tag},`;
        }
      }
      if (jsonRes.keywords) {
        for (keyword of jsonRes.keywords) {
          if (keyword.lastIndexOf('oc:socialtag') > -1) {
            APP_INFO.trackState['&&products'] += `oc-s;${keyword.substring(
              keyword.lastIndexOf('/') + 1
            )},`;
          } else if (keyword.lastIndexOf('oc:entities') > -1) {
            APP_INFO.trackState['&&products'] += `oc-e;${keyword.substring(
              keyword.lastIndexOf('/') + 1
            )},`;
          } else if (keyword.lastIndexOf('oc:') > -1) {
            APP_INFO.trackState['&&products'] += `oc;${keyword.substring(
              keyword.lastIndexOf('/') + 1
            )},`;
          } else if (keyword.lastIndexOf('ng:') > -1) {
            APP_INFO.trackState['&&products'] += `ng;${keyword.substring(
              keyword.lastIndexOf('/') + 1
            )},`;
          }
        }
      }
    }
  }

  const mainartHeight = scrollY.interpolate({
    inputRange: [0, MAINART_SCROLL_DISTANCE],
    outputRange: [MAINART_MAX_HEIGHT, MAINART_MIN_HEIGHT],
    extrapolate: 'clamp'
  });

  let animateOpacity = scrollY.interpolate({
    inputRange: [0, MAINART_SCROLL_DISTANCE / 2, MAINART_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.08],
    extrapolate: 'clamp'
  });
  let animateScaling = scrollY.interpolate({
    inputRange: [0, MAINART_SCROLL_DISTANCE],
    outputRange: [1, 1.5],
    extrapolate: 'clamp'
  });
  let mainArtAvialbility = isMainartAvailable(articleData);

  function navigateToGallery() {
    navigation.navigate('Gallery', {
      data: articleData.mainart,
      isMainart: true
    });
  }
  function isAnimationApplicable() {
    if (
      mainArtAvialbility.type === TYPES.YOUTUBE ||
      mainArtAvialbility.type === TYPES.HTML5MOBILE
    ) {
      return false;
    } else {
      return true;
    }
  }

  function getMainArt() {
    if (mainArtAvialbility.status && isAnimationApplicable()) {
      return (
        <Animated.View style={[styles.header, { height: mainartHeight }]}>
          <MainArt
            onPress={() => navigateToGallery()}
            data={articleData}
            loadSecondaryAsset={data => setsecondaryAsset(data)}
            style={{
              opacity: animateOpacity,
              height: MAINART_MAX_HEIGHT,
              transform: [
                { translateY: animateScaling },
                { scale: animateScaling }
              ]
            }}
          />
        </Animated.View>
      );
    } else if (mainArtAvialbility.status && !isAnimationApplicable()) {
      return (
        <View>
          <MainArt
            onPress={() => console.log('Youtube mainart')}
            data={articleData}
            loadSecondaryAsset={data => setsecondaryAsset(data)}
            style={{
              height:
                mainArtAvialbility.type === TYPES.HTML5MOBILE
                  ? 0
                  : MAINART_MAX_HEIGHT
            }}
          />
        </View>
      );
    } else {
      return false;
    }
  }
  const ARTICLE = (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar showShare />
      <View style={[styles.container]}>
        <Viewport.Tracker>
          <ScrollView
            removeClippedSubviews
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
                nativeEvent: { contentOffset: { y: scrollY } }
              }
            ])}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
                title="Getting news"
                enabled={true}
                colors={[colors.surface]}
                tintColor={colors.surface}
              />
            }>
            {!isAnimationApplicable() ? getMainArt() : false}
            <View
              style={[
                {
                  backgroundColor: props.theme.colors.background,
                  marginTop:
                    isAnimationApplicable() && mainArtAvialbility.status
                      ? MAINART_MAX_HEIGHT
                      : 0
                }
              ]}>
              <ArticleHeader data={articleData} />
              {articleData.authors && articleData.publisheddate ? (
                <AuthorByline
                  style={styles.byLineContainerStyle}
                  authors={articleData.authors}
                  readTime={articleData.readtime}
                  publisheddate={articleData.publisheddate}
                  lastmodifiedepoch={articleData.lastmodifiedepoch}
                  publishedepoch={articleData.publishedepoch}
                />
              ) : (
                  false
                )}
              <ArticleBody data={articleData} secondary={secondaryAsset} />
              <Disclaimer data={articleData} />
            </View>
            <CallToActionEmail page="article" />
          </ScrollView>
        </Viewport.Tracker>
        {isAnimationApplicable() ? getMainArt() : false}
      </View>
    </View>
  );

  return (
    <ConnectivityHOC>{loadingData ? <Loader /> : ARTICLE}</ConnectivityHOC>
  );
}

const styles = {
  container: { flex: 1 },
  byLineContainerStyle: {
    paddingHorizontal: SIZES.PaddingHorizontal,
    marginVertical: 10
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden'
  }
};

export default withNavigation(withTheme(Article));
