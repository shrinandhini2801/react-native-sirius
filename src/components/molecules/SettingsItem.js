import React from 'react';
import { List } from 'react-native-paper';
import { View, Linking, Image, Text } from 'react-native';
import { SIZES, getFontSize } from '@styles/sizes';
import { dimGray } from '@styles/colors';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { customFonts } from '@styles/customFonts';
import { layout } from '@utils/Layout';

const linkShare = require('../../../react/images/linkshare.png');

export const SettingsItem = props => {
  const {
    title,
    iconName,
    url,
    onPressProp,
    theme,
    borderTop,
    borderBottom,
    isLinkExport
  } = props;

  const _handlePress = async () => {
    if (url) {
      await InAppBrowser.open(url);
    }
  };

  if (title) {
    return (
      <List.Item
        style={{
          borderBottomWidth: borderBottom ? 0.5 : 0,
          borderTopWidth: borderTop ? 0.5 : 0,
          borderColor: theme.colors.listItemBorder,
          backgroundColor: theme.colors.surface,
          alignItems: 'center'
        }}
        titleStyle={{
          fontSize: getFontSize(SIZES.BASE),
          marginHorizontal: layout.isMobile ? 0 : SIZES.BASE
        }}
        title={title}
        onPress={() => (onPressProp ? onPressProp() : _handlePress())}
        right={props =>
          isLinkExport ? (
            <Image source={linkShare} style={styles.iconStyle} />
          ) : (
            <List.Icon {...props} icon={iconName} />
          )
        }
      />
    );
  } else {
    return null;
  }
};

export const SettingsTitle = props => {
  const { title, theme, style } = props;
  if (title) {
    return (
      <Text
        style={[
          style,
          styles.titleStyle,
          {
            fontSize: layout.isMobile
              ? getFontSize(SIZES.FONT)
              : getFontSize(SIZES.BASE),
            color: theme.colors.settingSectionHeader
          }
        ]}>
        {title}
      </Text>
    );
  } else {
    return null;
  }
};

const styles = {
  iconStyle: {
    marginVertical: 5,
    width: SIZES.FONT * 2,
    height: SIZES.FONT * 2,
    marginHorizontal: layout.isMobile ? SIZES.BASE : SIZES.BASE * 2
  },
  titleStyle: {
    color: dimGray,
    letterSpacing: 0.4,
    fontFamily: customFonts.merriweatherSansBold
  }
};
