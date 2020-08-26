import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';
import { analytics } from '@rootConfig/build.config';
import Sections from '@organisms/Sections';
import { trackState } from '@utils/Analytics';
import { APP_INFO } from '@rootConfig/apiConfig';
import useDeviceOrientation from '@hooks/deviceOrientation';

function SectionsScreen(props) {
  const deviceOrientation = useDeviceOrientation();
  const { colors } = props.theme;
  useFocusEffect(() => {
    APP_INFO.trackState = {};
    APP_INFO.trackState.pageName = `${
      analytics.siteName
    }|page|informational|all-sections`;
    APP_INFO.trackState.channel = 'informational';
    APP_INFO.trackState.pageURL = '/all-sections';
    APP_INFO.trackState.pageType = 'page';
    APP_INFO.trackState.pageTitle = 'all sections';
    APP_INFO.selectedCity = 'not-specified';
    APP_INFO.pageLocation = 'not-specified';
    APP_INFO.trackState.orientation = deviceOrientation;
    APP_INFO.trackState.testOrHier =
      'page|informational|none|none|all-sections';
    APP_INFO.trackState.subPageType = 'all-sections';
    APP_INFO.trackState.pageLocation = 'not-specified';
    APP_INFO.trackState.selectedCity = 'not-specified';
    trackState();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.lightBackground }]}>
      <Sections />
    </SafeAreaView>
  );
}

SectionsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withTheme(SectionsScreen);
