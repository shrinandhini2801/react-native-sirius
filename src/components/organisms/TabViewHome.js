import Loader from '@atoms/Loader';
import AppContext from '@context/AppContext';
import { NAV_ENDPOINT } from '@rootConfig/apiConfig';
import { GetHomeAndSectionData } from '@services/API';
import { NavCache } from '@services/Keys';
import { grey400, grey600 } from '@styles/colors';
import { customFonts } from '@styles/customFonts';
import { SIZES } from '@styles/sizes';
import { layout } from '@utils/Layout';
import { mapDispatchActions } from '@utils/redux';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { setTabSelected } from '../../redux/session/actions';
import NewsFeed from './NewsFeed';

const initialLayout = {
  height: 0,
  width: layout.width
};

const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});

function TabViewHome(props) {
  const { colors } = props.theme;
  const { selectedTheme } = useMappedState(mappedState);
  const [index, setIndex] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [routes, setRoutes] = useState([]);
  const [sceneMaps, setSceneMaps] = useState({});
  const context = useContext(AppContext);
  const actions = mapDispatchActions({ setTabSelected }, useDispatch());
  // On index changed on swipe
  function indexChanged(index) {
    actions.setTabSelected(index);
    setIndex(index);
  }

  useEffect(() => {
    setLoadingData(true);

    GetHomeAndSectionData(NAV_ENDPOINT, { cacheName: NavCache })
      .then(jsonData => {
        // Setting context
        context.navigation = jsonData.navigation;
        // Routes
        let dynamicSceneMaps = {};
        let dynamicRoutes = jsonData.navigation.map((element, index) => {
          const key = `${element.section.toLowerCase()}`;
          const title = `${element.section}`;
          const path = `${element.path}`;
          const didFetchData = index === 0 ? true : false;

          return { key, title, path, didFetchData, newsData: {} };
        });
        setRoutes(dynamicRoutes);
        // Setting Scenes after setting routes for passing data as props
        dynamicRoutes.forEach((element, index) => {
          dynamicSceneMaps[`${element.key}`] = () => (
            <NewsFeed
              routeIndex={index}
              newsData={element.newsData}
              path={element.path}
              navigation={context.navigation}
              isHome={index === 0 ? true : false}
            />
          );
        });
        setSceneMaps(dynamicSceneMaps);
        actions.setTabSelected(0);
        setLoadingData(false);
      })
      .catch(err => {
        console.log('Error ', err);
      });
  }, []);

  const TABVIEWS = (
    <TabView
      navigationState={{ index, routes }}
      lazy
      renderScene={SceneMap(sceneMaps)}
      onIndexChange={index => indexChanged(index)}
      initialLayout={initialLayout}
      style={styles.container}
      renderTabBar={props => (
        <View>
          <TabBar
            {...props}
            scrollEnabled={true}
            indicatorStyle={{ backgroundColor: colors.primary, height: 2.5 }}
            style={{
              backgroundColor: colors.headerBackground,
              borderBottomWidth: 0.3,
              borderColor: selectedTheme === 'dark' ? grey600 : grey400
            }}
            tabStyle={{ width: 'auto', height: SIZES.BASE * 3 }}
            renderLabel={({ route, focused, color }) => (
              <Text
                style={{
                  paddingLeft: layout.isMobile
                    ? SIZES.PADDING * 0.5
                    : SIZES.PADDING * 1.5,
                  paddingRight: layout.isMobile
                    ? SIZES.PADDING * 0.5
                    : SIZES.PADDING * 1.5,
                  paddingBottom: 0,
                  marginBottom: 0,
                  fontFamily: customFonts.merriweatherSansBold,
                  fontWeight: focused ? 'bold' : 'normal',
                  // color: focused ? colors.navFocus : colors.navNormal,
                  fontSize: layout.isMobile ? SIZES.FONT + 1 : SIZES.FONT + 2
                }}>
                {route.title}
              </Text>
            )}
          />
        </View>
      )}
    />
  );

  if (loadingData) {
    return <Loader loadingText={'Getting News'} />;
  } else {
    return TABVIEWS;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withTheme(TabViewHome);
