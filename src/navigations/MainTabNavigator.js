import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { hasNotch } from 'react-native-device-info';
import TabBarIcon from '@atoms/TabBarIcon';
import HomeScreen from '@screens/HomeScreen';
import SectionsScreen from '@screens/SectionsScreen';
import SettingsScreen from '@screens/SettingsScreen';
import ArticleScreen from '@screens/ArticleScreen';
import GalleryScreen from '@screens/GalleryScreen';
import SectionFeedScreen from '@screens/SectionFeedScreen';
import InAppBrowserScreen from '@screens/InAppBrowserScreen';
import { localStrings } from '@utils/i18n';
import AppHeader from '@atoms/AppHeader';
import { SIZES } from '@styles/sizes';
import { useMappedState } from 'redux-react-hook';
import { layout } from '@utils/Layout';
import {
  matterhorn,
  white,
  headerGrey,
  grey400,
  grey600
} from '@styles/colors';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});

const setHeader = () => {
  const { selectedTheme } = useMappedState(mappedState);
  if (Platform.OS === 'ios') {
    return {
      headerTitle: <AppHeader />,
      headerStyle: {
        height:
          hasNotch() || !layout.isMobile
            ? SIZES.LOGO_HEIGHT + SIZES.STATUSBAR_HEIGHT
            : SIZES.LOGO_HEIGHT + SIZES.FONT,
        backgroundColor: selectedTheme === 'dark' ? headerGrey : white,
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        }
      }
    };
  } else {
    return {
      header: props => <AppHeader {...props} />
    };
  }
};

const HideHeader = {
  headerStyle: {
    height: 0
  },
  headerTitle: null,
  headerLeft: null
};

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={setHeader()} />
    </Stack.Navigator>
  );
}

function SectionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Links"
        component={SectionsScreen}
        options={HideHeader}
      />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={HideHeader}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const { selectedTheme } = useMappedState(mappedState);
  return (
    <Tab.Navigator
      screenOptions={HideHeader}
      tabBarOptions={{
        style: {
          backgroundColor: selectedTheme === 'dark' ? headerGrey : white,
          borderTopColor: selectedTheme === 'dark' ? grey600 : grey400
        },
        labelStyle: {
          color: selectedTheme === 'dark' ? white : matterhorn,
          fontSize: layout.isMobile ? SIZES.FONT : SIZES.FONT + 2
        }
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: localStrings('bottomNav.news'),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} homeIcon />
        }}
      />
      <Tab.Screen
        name="Sections"
        component={SectionsStack}
        options={{
          tabBarLabel: localStrings('bottomNav.sections'),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'md-menu' : 'md-menu'}
            />
          )
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarLabel: localStrings('bottomNav.preferences'),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'md-settings' : 'md-settings'}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="News" options={HideHeader} component={TabNavigator} />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={HideHeader}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={HideHeader}
      />
      <Stack.Screen
        name="InAppBrowser"
        component={InAppBrowserScreen}
        options={HideHeader}
      />
      <Stack.Screen
        name="SectionFeed"
        component={SectionFeedScreen}
        options={HideHeader}
      />
    </Stack.Navigator>
  );
}
export default RootNavigator;
