import React, { useState } from 'react';
import { withTheme, Divider, Text } from 'react-native-paper';
import { withNavigation } from '@react-navigation/compat';
import { View, StyleSheet } from 'react-native';
import { AEM_ENDPOINT } from '@rootConfig/apiConfig';
import { SIZES, getFontSize } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';
import { layout } from '@utils/Layout';

function ListItemAccordion(props) {
  const { data, navigation } = props;
  const { colors } = props.theme;
  const [expanded, setExpanded] = useState(true);
  let URL = data.url ? `${AEM_ENDPOINT}${data.url}` : null;
  const _handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <View key={`${data.path}`}>
        <Text
          style={{
            fontSize: getFontSize(SIZES.FONT_LARGE_1),
            color: colors.sectionTitle,
            fontFamily: customFonts.torstarDeckBold,
            paddingTop: SIZES.MARGIN * 1.5,
            paddingBottom: SIZES.BASE - 2,
            marginLeft: layout.isMobile ? SIZES.MARGIN : SIZES.MARGIN * 4
          }}
          onPress={() => {
            console.log('Clicked ', data.path);
            navigation.navigate('SectionFeed', {
              url: data.path
            });
          }}>
          {data.section}
        </Text>
        <Divider style={[styles.divider, { borderColor: colors.line }]} />
      </View>
      {data.subSections.map((subNav, index) => {
        return (
          <View key={`${index}-${subNav.path}`}>
            <Text
              style={{
                fontSize: getFontSize(SIZES.MINIFONT * 2),
                color: colors.sectionTitle,
                fontFamily: customFonts.torstarTextO2Roman,
                paddingTop: SIZES.BASE,
                paddingBottom: SIZES.BASE - 4,
                paddingLeft: layout.isMobile
                  ? SIZES.MARGIN * 3
                  : SIZES.MARGIN * 6
              }}
              onPress={() => {
                console.log('Clicked ', subNav.path);
                navigation.navigate('SectionFeed', {
                  url: subNav.path
                });
              }}>
              {subNav.section}
            </Text>
            <Divider
              style={{
                marginHorizontal: layout.isMobile
                  ? SIZES.MARGIN * 2
                  : SIZES.MARGIN * 6,
                borderWidth: 0.5,
                borderColor: colors.lineLight
              }}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderWidth: 0.5,
    marginHorizontal: layout.isMobile ? SIZES.MARGIN : SIZES.MARGIN * 4
  }
});

export default withTheme(withNavigation(ListItemAccordion));
