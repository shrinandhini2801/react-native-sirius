import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { withTheme } from 'react-native-paper';
import { SIZES, PADDING_BW_ITEMS, getFontSize } from '@styles/sizes';

import GetIcon from '@atoms/GetIcon';
/**
 * This is a common component for rendering In App Browser link (PollDaddy , Scribd)
 * @param {*} props data, title, iconName
 *
 */

function RenderIABLink(props) {
  const { data, title, iconName, onPress } = props;
  function onLinkPress() {
    props.navigation.navigate('InAppBrowser', {
      data: data,
      isEmbed: true
    });
  }

  const iconSize = getFontSize(SIZES.ICON) + getFontSize(4);
  return (
    <TouchableOpacity
      onPress={() => {
        onPress ? onPress() : onLinkPress();
      }}
      style={styles.buttonWrap}
      activeOpacity={1}>
      <View style={styles.iconWrapper}>
        <GetIcon name={iconName} size={iconSize} color={styles.icon.color} />
        <Text
          style={[
            styles.backTitle,
            { color: styles.icon.color, fontSize: getFontSize(SIZES.BASE) }
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: '#0072BC'
  },
  backTitle: {
    flex: 1,
    marginLeft: 5
  },
  buttonWrap: {
    flex: 1,
    marginHorizontal: SIZES.PaddingHorizontal,
    marginBottom: PADDING_BW_ITEMS
  }
};

export default withTheme(withNavigation(RenderIABLink));
