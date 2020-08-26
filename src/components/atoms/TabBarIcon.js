import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withTheme } from 'react-native-paper';
import { layout } from '@utils/Layout';

function TabBarIcon(props) {
  const { colors } = props.theme;
  if (props.homeIcon) {
    return (
      <FontAwesome5
        name={'newspaper'}
        solid
        size={layout.isMobile ? 26 : 22}
        style={{ marginBottom: -3 }}
        color={props.focused ? colors.primary : colors.tabIcon}
      />
    );
  } else {
    return (
      <Ionicons
        name={props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={props.focused ? colors.primary : colors.tabIcon}
      />
    );
  }
}

export default withTheme(TabBarIcon);
