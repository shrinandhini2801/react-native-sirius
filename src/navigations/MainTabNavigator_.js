import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

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

const ARTICLE = 'Article';
const INAPPBROWSER = 'InAppBrowser';
const GALLERY = 'Gallery';

const headerNavOptions = {
  header: <AppHeader />
};
const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: headerNavOptions
  },
  Article: {
    screen: ArticleScreen,
    navigationOptions: {
      header: null
    }
  },
  SectionFeed: {
    screen: SectionFeedScreen,
    navigationOptions: {
      header: null
    }
  },
  InAppBrowser: {
    screen: InAppBrowserScreen,
    navigationOptions: {
      header: null
    }
  },
  Gallery: {
    screen: GalleryScreen,
    navigationOptions: {
      header: null
    }
  }
});

HomeStack.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {
    tabBarLabel: localStrings('bottomNav.news'),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} homeIcon={true} />
    )
  };
  if (
    routeName === ARTICLE ||
    routeName === INAPPBROWSER ||
    routeName === GALLERY
  ) {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

const SectionsStack = createStackNavigator({
  Links: {
    screen: SectionsScreen,
    navigationOptions: {
      header: null
    }
  },
  Article: {
    screen: ArticleScreen,
    navigationOptions: {
      header: null
    }
  },
  SectionFeed: {
    screen: SectionFeedScreen,
    navigationOptions: {
      header: null
    }
  },
  InAppBrowser: {
    screen: InAppBrowserScreen,
    navigationOptions: {
      header: null
    }
  },
  Gallery: {
    screen: GalleryScreen,
    navigationOptions: {
      header: null
    }
  }
});

SectionsStack.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {
    tabBarLabel: localStrings('bottomNav.sections'),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'md-menu' : 'md-menu'}
      />
    )
  };
  if (
    routeName === ARTICLE ||
    routeName === INAPPBROWSER ||
    routeName === GALLERY
  ) {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

const AccountStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      header: null
    }
  },
  Article: {
    screen: ArticleScreen,
    navigationOptions: {
      header: null
    }
  },
  SectionFeed: {
    screen: SectionFeedScreen,
    navigationOptions: {
      header: null
    }
  },
  InAppBrowser: {
    screen: InAppBrowserScreen,
    navigationOptions: {
      header: null
    }
  },
  Gallery: {
    screen: GalleryScreen,
    navigationOptions: {
      header: null
    }
  }
});

AccountStack.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {
    tabBarLabel: localStrings('bottomNav.preferences'),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'md-settings' : 'md-settings'}
      />
    )
  };
  if (
    routeName === ARTICLE ||
    routeName === INAPPBROWSER ||
    routeName === GALLERY
  ) {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

const tabNavigator = createBottomTabNavigator(
  {
    home: HomeStack,
    sections: SectionsStack,
    account: AccountStack
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export default MainTabNavigator = createAppContainer(
  createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: tabNavigator
  })
);
