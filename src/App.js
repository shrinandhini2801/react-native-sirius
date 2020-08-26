import React, { useEffect } from 'react';
import { Alert, NativeModules, Linking, Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import defaultTheme from '@styles/defaultTheme';
import DeviceInfo from 'react-native-device-info';
import darkTheme from '@styles/darkTheme';
import TabNavigator from '@navigations/MainTabNavigator';
import AppContext from '@context/AppContext';
import { iOS, android } from '@rootConfig/build.config';
import {
  ADOBE_LAUNCH_ENDPOINT,
  ENVIRONMENT,
  APP_INFO
} from '@rootConfig/apiConfig';
import { localStrings } from '@utils/i18n';
import remoteConfig from '@react-native-firebase/remote-config';
import { ACPAnalytics } from '@adobe/react-native-acpanalytics';
import {
  ACPCore,
  ACPIdentity,
  ACPMobileLogLevel,
  ACPMobilePrivacyStatus,
  ACPSignal,
  ACPLifecycle
} from '@adobe/react-native-acpcore';
import { NavigationContainer } from '@react-navigation/native';
import { useMappedState } from 'redux-react-hook';
import ConnectivityHOC from '@molecules/ConnectivityHOC';
import * as ScreenOrientation from 'expo-screen-orientation';
import { layout } from '@utils/Layout';
import messaging from '@react-native-firebase/messaging';

const appState = {
  allNewsData: {},
  navigation: [],
  isNetConnected: false
};

const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});

const convertAppVersionToNum = appVersion =>
  appVersion &&
  parseInt(
    appVersion
      .toString()
      .split('.')
      .join('')
  );

async function requestUserPermission() {
  const settings = await messaging().requestPermission();

  if (settings) {
    console.log('Permission settings:', settings);
  }
}

export const exitApp = () => NativeModules.UtilityBridge.exitApp();

const initSDK = async () => {
  ACPCore.setLogLevel(ACPMobileLogLevel.VERBOSE);
  ACPCore.setPrivacyStatus(ACPMobilePrivacyStatus.OPT_IN);
  ACPCore.configureWithAppId(ADOBE_LAUNCH_ENDPOINT);
  ACPIdentity.registerExtension();
  ACPIdentity.getExperienceCloudId().then(
    cloudId => (APP_INFO.mID = cloudId),
    error => console.log(error)
  );
  ACPAnalytics.registerExtension();
  ACPSignal.registerExtension();
  await ACPCore.start();
};

const App = () => {
  const { selectedTheme } = useMappedState(mappedState);

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }
  useEffect(() => {
    requestUserPermission();
    changeScreenOrientation();
    initSDK();
    if (ENVIRONMENT == 'dev') {
      requestUserPermission();
      messaging()
        .subscribeToTopic('dev')
        .then(() => console.log('Subscribed to topic!'));
    }
    remoteConfig()
      .fetch()
      .then(() => {
        return remoteConfig().activate();
      })
      .then(activated => {
        if (!activated) console.log('Fetched data not activated');
        if (ENVIRONMENT == 'dev') {
          return remoteConfig().getValue('min_version_dev');
        } else if (ENVIRONMENT == 'alpha') {
          return remoteConfig().getValue('alpha_force_version');
        } else {
          return remoteConfig().getValue('min_version');
        }
      })
      .then(result => {
        const currentAppVersion = convertAppVersionToNum(
          DeviceInfo.getVersion()
        );
        const forcedVersion = convertAppVersionToNum(
          result.value ? result.value : DeviceInfo.getVersion()
        );
        if (forcedVersion > currentAppVersion) {
          Alert.alert(
            ENVIRONMENT == 'alpha'
              ? 'Please update to the Alpha app version.'
              : localStrings('forceUpgrade.message'),
            '',
            [
              {
                onPress: () => {
                  exitApp();
                },
                text: localStrings('forceUpgrade.closeButton')
              },
              {
                onPress: () => {
                  Linking.openURL(
                    Platform.OS === 'ios'
                      ? iOS.appStoreLink
                      : android.appStoreLink
                  )
                    .then(() => exitApp())
                    .catch(() => exitApp());
                },
                text: localStrings('forceUpgrade.updateButton')
              }
            ],
            {
              cancelable: false
            }
          );
        }
      })
      .then(() => {
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log(
            'Notification caused app to open from background state: ',
            remoteMessage
          );
        });
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            console.log(
              'Notification caused app to open from quit state: ',
              remoteMessage
            );
          });
      })
      .catch(console.error);
  }, []);
  return (
    <NavigationContainer>
      <PaperProvider
        theme={selectedTheme === 'light' ? defaultTheme : darkTheme}>
        <AppContext.Provider value={appState}>
          <ConnectivityHOC>
            <TabNavigator theme={selectedTheme} />
          </ConnectivityHOC>
        </AppContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
