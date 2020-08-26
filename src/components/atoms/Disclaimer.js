import React from 'react';
import { View, Platform } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { SIZES, getFontSize } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';
import { displayTrustLabel, TRUST_LABEL_TYPES } from '@utils/displayTrustLabel';

function Disclaimer(props) {
  const { data } = props;
  const { colors } = props.theme;
  return (
    <>
      {data &&
      data.trustlabel &&
      data.trustlabel.description &&
      displayTrustLabel(
        data.trustlabel.name,
        TRUST_LABEL_TYPES.ADVERTISEMENT
      ) ? (
        <View
          style={{
            borderColor: colors.onBackground,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            paddingTop: SIZES.BASE,
            paddingBottom: SIZES.BASE,
            marginTop: SIZES.BASE,
            marginBottom: SIZES.BASE,
            marginLeft: SIZES.BASE,
            marginRight: SIZES.BASE,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={{
              fontFamily: customFonts.merriweatherSansRegular,
              paddingTop: 0,
              paddingLeft: SIZES.BASE,
              paddingRight: SIZES.BASE,
              lineHeight: SIZES.BASE,
              borderColor: colors.onBackground,
              fontSize: getFontSize(SIZES.FONT),
              justifyContent: 'center',
              alignItems: 'center',
              color: colors.publishedDate
            }}>
            <Text
              style={{
                fontWeight: Platform.OS === 'ios' ? 'bold' : '800',
                fontFamily: customFonts.merriweatherSansBold,
                color: colors.disclaimerTitle
              }}>
              DISCLAIMER:{' '}
            </Text>
            {data.trustlabel.description}
          </Text>
        </View>
      ) : null}
    </>
  );
}

export default withTheme(Disclaimer);
