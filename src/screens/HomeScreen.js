import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Linking, StatusBar } from 'react-native';
import { withTheme } from 'react-native-paper';
import TabViewHome from '@organisms/TabViewHome';
import { useMappedState } from 'redux-react-hook';
import messaging from '@react-native-firebase/messaging';
const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});
function HomeScreen(props) {
  const { selectedTheme } = useMappedState(mappedState);
  const { navigation } = props;
  const { colors } = props.theme;
  const navigateFromDeepLink = dataObj => {
    if (dataObj.route) {
      switch (dataObj.route) {
        case 'article':
          if (dataObj.url && dataObj.storyuuid) {
            navigation.navigate('Article', {
              url: dataObj.url,
              storyuuid: dataObj.storyuuid
            });
          } else {
            null;
          }
        default:
          return null;
      }
    }
  };
  useEffect(() => {
    /** Handles deep linking URL even when the app is killed  */

    Linking.getInitialURL()
      .then(url => {
        if (url) {
          handleOpenURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (!(remoteMessage.data == null || remoteMessage.data == undefined)) {
        navigateFromDeepLink(remoteMessage.data);
        console.log(
          'Notification caused app to open from background state: HOMESCREEN',
          remoteMessage
        );
      }
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (!(remoteMessage.data == null || remoteMessage.data == undefined)) {
          navigateFromDeepLink(remoteMessage.data);
          console.log(
            'Notification caused app to open from quit state: HOMESCREEN',
            remoteMessage
          );
        }
      });
    Linking.addEventListener('url', e => handleOpenURL(e.url));
    return () => {
      Linking.removeEventListener('url', e => handleOpenURL(e));
    };
  }, []);
  function handleOpenURL(URL) {
    // URL format
    // thespec://${article}/${articleUrl}?${uuid}
    const url = URL;
    let parsed_url = url.split('//')[1];
    let route = parsed_url.split('/')[0];
    let start_of_article_url = parsed_url.indexOf('/');
    let end_of_article_url = parsed_url.indexOf('?');
    let articleUrl = parsed_url.substring(
      start_of_article_url,
      end_of_article_url
    );
    let uuid = parsed_url.substring(end_of_article_url + 1);
    if (route === 'article') {
      navigation.navigate('Article', {
        url: articleUrl,
        storyuuid: uuid
      });
    }
    if (route === 'forgotpassword') {
      navigation.navigate('Account');
    }
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={selectedTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <TabViewHome />
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withTheme(HomeScreen);
