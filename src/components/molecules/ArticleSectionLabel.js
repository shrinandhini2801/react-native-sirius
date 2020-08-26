import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { customFonts } from '@styles/customFonts';
import { withTheme } from 'react-native-paper';
import { SIZES, getFontSize } from '@styles/sizes';
import TrustLabel from '@atoms/TrustLabel';

function ArticleSectionLabel(props) {
  const { style, label, theme, trustLabel } = props;
  return (
    <View
      style={[
        style,
        styles.container,
        { height: getFontSize(SIZES.LABELHEIGHT) }
      ]}>
      <View
        style={[
          styles.label,
          {
            flexDirection: 'row',
            height: getFontSize(SIZES.LABELHEIGHT)
          }
        ]}>
        {label && (
          <Text
            style={[
              styles.labelText,
              {
                color: theme.colors.onBackground,
                borderBottomColor: theme.colors.placeholder,
                fontSize: getFontSize(SIZES.FONT),
                lineHeight: getFontSize(SIZES.BASE)
              }
            ]}>
            {label.label.toUpperCase()}
          </Text>
        )}
        {trustLabel && <TrustLabel trustLabel={trustLabel} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: SIZES.PaddingHorizontal,
    marginVertical: 17
  },
  label: {
    justifyContent: 'center'
  },
  labelText: {
    fontFamily: customFonts.torstarDeckBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : '800',
    letterSpacing: 0.8,
    marginRight: SIZES.MINIFONT
  }
});

export default withTheme(ArticleSectionLabel);
