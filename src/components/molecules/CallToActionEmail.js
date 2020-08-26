import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { withTheme } from 'react-native-paper';
import { withNavigation } from '@react-navigation/compat';
import { SIZES, getFontSize } from '@styles/sizes';
import STitle from '@atoms/STitle';
import { customFonts } from '@styles/customFonts';
import SButton from '@atoms/SButton';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { layout } from '@utils/Layout';
import { localStrings } from '@utils/i18n';
import { cta } from '@rootConfig/build.config';
import { customStyles } from '@styles/customStyles';

function CallToActionEmail(props) {
  const { navigation, story, paddingTop, page } = props;
  const { colors } = props.theme;

  const callToActionPress = async () => {
    if (await InAppBrowser.isAvailable()) {
      if (page == 'home') {
        await InAppBrowser.open(cta.emailHomePage);
      }

      if (page === 'section') {
        await InAppBrowser.open(cta.emailSectionPage);
      }

      if (page === 'article') {
        await InAppBrowser.open(cta.emailArticlePage);
      }
    }
  };
  const { cta_style, hasBorder, textColor } = customStyles;

  return layout.isMobile ? (
    <View
      style={[
        styles.card,
        styles.shadows,
        {
          backgroundColor: cta_style.viewBgColor,
          borderWidth: hasBorder ? 1 : 0,
          borderColor: cta_style.buttonBgColor
        }
      ]}>
      <STitle
        title={localStrings('cta.emailTitle')}
        size={SIZES.FONT * 2}
        lineHeight={29}
        style={{
          color: textColor,
          textAlign: 'center',
          fontFamily: customFonts.torstarDeckCondensedSemibold,
          fontWeight: Platform.OS === 'ios' ? 'bold' : '800'
        }}
      />
      <STitle
        title={localStrings('cta.emailDescription')}
        size={SIZES.BASE}
        lineHeight={19}
        style={{
          color: textColor,
          textAlign: 'center',
          fontFamily: customFonts.torstarTextO2Roman
        }}
      />
      <SButton
        onPressAction={callToActionPress}
        label={localStrings('cta.signup')}
        labelStyle={{
          fontFamily: customFonts.merriweatherSansBold,
          color: cta_style.buttonTextColor,
          fontWeight: Platform.OS === 'ios' ? 'bold' : '800'
        }}
        buttonContentStyle={{
          height: SIZES.FONT * 3,
          marginTop: SIZES.MARGIN,
          borderRadius: 4,
          paddingLeft: SIZES.MARGIN * 2,
          paddingRight: SIZES.MARGIN * 2,
          backgroundColor: cta_style.buttonBgColor
        }}
      />
    </View>
  ) : (
    <View
      style={[
        styles.card,
        styles.shadows,
        {
          backgroundColor: cta_style.viewBgColor,
          flexDirection: 'row',
          paddingHorizontal: SIZES.PADDING * 2,
          borderWidth: hasBorder ? 1 : 0,
          borderColor: cta_style.buttonBgColor
        }
      ]}>
      <View style={{ width: '78%', marginVertical: SIZES.MINIFONT }}>
        <STitle
          title={localStrings('cta.emailTitleTab')}
          size={SIZES.FONT * 2}
          lineHeight={29}
          style={{
            color: textColor,
            fontFamily: customFonts.torstarDeckCondensedBold,
            fontWeight: Platform.OS === 'ios' ? 'bold' : '800'
          }}
        />
        <STitle
          title={localStrings('cta.emailDescriptionTab')}
          size={SIZES.BASE}
          lineHeight={19}
          style={{
            color: textColor,
            paddingTop: 5,
            fontFamily: customFonts.torstarTextO2Roman
          }}
        />
      </View>
      <SButton
        onPressAction={callToActionPress}
        label={localStrings('cta.signup')}
        labelStyle={{
          fontFamily: customFonts.merriweatherSansBold,
          fontSize: SIZES.FONT + 2,
          fontWeight: Platform.OS === 'ios' ? 'bold' : '800',
          color: cta_style.buttonTextColor
        }}
        buttonContentStyle={{
          height: SIZES.FONT_LARGE_2,
          width: '100%',
          backgroundColor: cta_style.buttonBgColor,
          borderRadius: 4,
          paddingLeft: SIZES.MARGIN * 2,
          paddingRight: SIZES.MARGIN * 2
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: SIZES.MARGIN,
    margin: SIZES.MARGIN,
    marginBottom: SIZES.BASE,
    borderRadius: 4
  },
  shadows: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65
  }
});

export default withNavigation(withTheme(CallToActionEmail));
