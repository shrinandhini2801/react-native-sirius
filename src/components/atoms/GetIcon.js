import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { withTheme } from 'react-native-paper';

function GetIcon(props) {
  const { colors } = props.theme;
  if (props.isMaterial) {
    return (
      <MaterialCommunityIcons
        name={props.name}
        size={props.size}
        color={props.color}
        style={props.style || styles}
      />
    );
  } else if (props.isFeather) {
    return (
      <Feather
        name={props.name}
        size={props.size}
        color={props.color}
        style={props.style || styles}
      />
    );
  } else {
    return (
      <Ionicons
        name={props.name}
        size={props.size}
        color={props.color}
        style={props.style || styles}
      />
    );
  }
}
const styles = {};

export default withTheme(GetIcon);
