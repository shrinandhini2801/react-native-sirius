import React from 'react';
import { StyleSheet } from 'react-native';
import { Caption } from 'react-native-paper';
import { SIZES, getFontSize } from '@styles/sizes';
import { localStrings } from '@utils/i18n';
import { customFonts } from '@styles/customFonts';

const CopyrightDisplay = props => (
  <Caption
    style={[
      styles.container,
      {
        fontFamily: customFonts.merriweatherSansRegular,
        fontSize: getFontSize(SIZES.FONT),
        paddingVertical: getFontSize(SIZES.BASE / 2),
        color: props.theme.colors.settingSectionHeader
      }
    ]}>
    {`© ${new Date().getFullYear()} ${localStrings('settings.copyright')}`}
  </Caption>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.MARGIN
  }
});

export default CopyrightDisplay;
