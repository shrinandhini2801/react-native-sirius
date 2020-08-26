import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import { withTheme, List, Divider, Caption } from 'react-native-paper';
import { localStrings } from '@utils/i18n';
import { SettingsItem, SettingsTitle } from '@molecules/SettingsItem';
import { sendMail } from '@utils/SettingsUtils';
import { SIZES } from '@styles/sizes';
import { ENVIRONMENT, APP_INFO } from '@rootConfig/apiConfig';
import DeviceInfo from 'react-native-device-info';
import DarkModeToggle from '@molecules/DarkModeToggle';
import CopyrightDisplay from '@molecules/CopyrightDisplay';
import TextHeader from '@atoms/TextHeader';
import { layout } from '@utils/Layout';
import useDeviceOrientation from '@hooks/deviceOrientation';
import { trackState } from '@utils/Analytics';
import { analytics } from '@rootConfig/build.config';
import { useMappedState } from 'redux-react-hook';

const mappedState = state => ({
  user: state.sessionReducer.user,
  login_pending: state.sessionReducer.login_pending,
  selectedTheme: state.sessionReducer.selectedTheme
});

function SettingsScreen(props) {
  const { selectedTheme } = useMappedState(mappedState);
  const { colors } = props.theme;
  /**---Analytics---*/
  const deviceOrientation = useDeviceOrientation();
  useFocusEffect(() => {
    APP_INFO.trackState = {};
    APP_INFO.trackState.pageName = `${analytics.siteName}|page|user|settings`;
    APP_INFO.trackState.channel = 'user';
    APP_INFO.trackState.testOrHier = 'page|user|content|none|settings';
    APP_INFO.trackState.pageType = 'page';
    APP_INFO.trackState.subPageType = 'settings';
    APP_INFO.trackState.pageTitle = 'settings';
    APP_INFO.trackState.pageURL = '/settings';
    APP_INFO.trackState.pageLocation = 'not-specified';
    APP_INFO.trackState.selectedCity = 'not-specified'; //This will suject to change when we add city selction feature.
    APP_INFO.trackState.orientation = deviceOrientation;
    trackState();
  }, []);
  /**---Analytics---*/

  let line = <View style={[styles.line, { borderColor: colors.disabled }]} />;
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.lightBackground }]}>
      <StatusBar
        barStyle={selectedTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <TextHeader headerTitle={localStrings('settings.preferences_title')} />
      <ScrollView>
        <List.Section
          style={{
            marginTop: layout.isMobile ? SIZES.BASE * 2 : SIZES.BASE * 3
          }}>
          <SettingsItem
            isLinkExport
            borderTop={true}
            borderBottom={true}
            theme={props.theme}
            title={localStrings('settings.get_newsletter')}
            url={localStrings('settings.newsletter_url_settings')}
          />

          <SettingsTitle
            theme={props.theme}
            title={localStrings('settings.title')}
            style={styles.paddingBWSections}
          />
          <Divider />
          {/* <SettingsItem
            theme={props.theme}
            borderTop={true}
            borderBottom={true}
            title={localStrings('settings.notification')}
            iconName="chevron-right"
          /> */}

          <DarkModeToggle theme={props.theme} />

          {/* <SettingsItem
            borderTop={true}
            theme={props.theme}
            title={localStrings('settings.text_size')}
          />
          <TextSlider /> */}
          <Divider />
          <SettingsTitle
            theme={props.theme}
            title={localStrings('settings.feedback')}
            style={styles.paddingBWSections}
          />
          <Divider />
          {/* <SettingsItem
            title={localStrings('settings.review_app')}
            iconName="chevron-right"
          /> */}
          <SettingsItem
            isLinkExport
            borderTop={true}
            theme={props.theme}
            title={localStrings('settings.provide_feedback')}
            onPressProp={() => {
              sendMail(
                localStrings('feedback.email'),
                localStrings('feedback.subject')
              );
            }}
          />
          <SettingsItem
            isLinkExport
            borderTop={true}
            borderBottom={true}
            theme={props.theme}
            title={localStrings('settings.report_news_error')}
            onPressProp={() => {
              sendMail(
                localStrings('reportNewsError.email'),
                localStrings('reportNewsError.subject')
              );
            }}
          />

          <Divider />
          <SettingsTitle
            theme={props.theme}
            title={localStrings('settings.legal')}
            style={styles.paddingBWSections}
          />
          <Divider />
          <SettingsItem
            isLinkExport
            borderTop={true}
            borderBottom={true}
            theme={props.theme}
            title={localStrings('settings.privacy_policy')}
            url={localStrings('settings.privacy_url')}
          />
          <SettingsItem
            isLinkExport
            borderBottom={true}
            theme={props.theme}
            title={localStrings('settings.privacy_spam_notice')}
            url={localStrings('settings.privacy_spam_url')}
          />
          <SettingsItem
            isLinkExport
            borderBottom={true}
            theme={props.theme}
            title={localStrings('settings.terms')}
            url={localStrings('settings.terms_url')}
          />
          <SettingsItem
            isLinkExport
            borderBottom={true}
            theme={props.theme}
            title={localStrings('settings.ad_terms')}
            url={localStrings('settings.ad_terms_url')}
          />
          <Divider />
        </List.Section>

        <CopyrightDisplay theme={props.theme} />
        <Caption
          style={[
            styles.appVerStyle,
            { color: props.theme.colors.settingSectionHeader }
          ]}>
          {localStrings('settings.app_version') + ' ' + DeviceInfo.getVersion()}
        </Caption>
        <Caption
          style={[
            styles.buildNumStyle,
            { color: props.theme.colors.settingSectionHeader }
          ]}>
          {localStrings('settings.build_number') +
            ' ' +
            DeviceInfo.getBuildNumber()}
        </Caption>
        {ENVIRONMENT !== 'prod' && (
          <Caption
            style={[
              styles.buildNumStyle,
              { color: props.theme.colors.settingSectionHeader }
            ]}>
            {localStrings('settings.environment') + ' : ' + ENVIRONMENT}
          </Caption>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

SettingsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  appVerStyle: {
    marginTop: SIZES.BASE * 2,
    marginHorizontal: SIZES.MARGIN,
    fontSize: SIZES.FONT
  },
  buildNumStyle: {
    marginHorizontal: SIZES.MARGIN,
    fontSize: SIZES.FONT
  },
  paddingBWSections: {
    paddingTop: SIZES.BASE * 2,
    paddingBottom: SIZES.BASE,
    paddingHorizontal: SIZES.BASE
  },
  line: {
    borderWidth: 0.5,
    marginTop: 5,
    marginBottom: 25,
    marginHorizontal: SIZES.PADDING
  },
  title: {
    opacity: 0.78,
    paddingHorizontal: SIZES.PADDING + 4,
    letterSpacing: 0.4
  }
});

export default withTheme(SettingsScreen);
