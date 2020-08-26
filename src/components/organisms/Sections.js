import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, withTheme, Divider, Text } from 'react-native-paper';
import { localStrings } from '@utils/i18n';
import { withNavigation } from '@react-navigation/compat';
import { NavCache } from '@services/Keys';
import { getData } from '@services/LocalStorage';
import ListItemAccordion from '@molecules/ListItemAccordion';
import { SIZES, getFontSize } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';
import TextHeader from '@atoms/TextHeader';
import { layout } from '@utils/Layout';

function Sections(props) {
  const { navigation } = props;
  const { colors } = props.theme;
  const [navData, setNavData] = useState(null);
  useEffect(() => {
    getData(NavCache).then(data => {
      setNavData(data);
    });
  }, []);

  return (
    <>
      <TextHeader headerTitle={localStrings('settings.sections_title')} />
      <ScrollView style={{ margin: 0, padding: 0 }}>
        <List.Section style={styles.container}>
          {navData &&
            navData.navigation.map(nav => {
              if (nav.subSections.length > 0) {
                return <ListItemAccordion data={nav} key={`${nav.path}`} />;
              }
              return (
                <View key={`${nav.path}`}>
                  <Text
                    style={{
                      fontSize: getFontSize(SIZES.FONT_LARGE_1),
                      color: colors.sectionTitle,
                      fontFamily: customFonts.torstarDeckBold,
                      paddingTop: SIZES.BASE * 1.5,
                      paddingBottom: SIZES.BASE - 2,
                      marginLeft: layout.isMobile
                        ? SIZES.MARGIN
                        : SIZES.MARGIN * 4
                    }}
                    onPress={() => {
                      console.log('Clicked ', nav.path);
                      navigation.navigate('SectionFeed', {
                        url: nav.path,
                        isHome: nav.path === '/home'
                      });
                    }}>
                    {nav.section}
                  </Text>
                  <Divider
                    style={[styles.divider, { borderColor: colors.line }]}
                  />
                </View>
              );
            })}
        </List.Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: SIZES.MARGIN,
    marginRight: SIZES.MARGIN
  },
  divider: {
    borderWidth: 0.5,
    marginHorizontal: layout.isMobile ? SIZES.MARGIN : SIZES.MARGIN * 4
  }
});

export default withNavigation(withTheme(Sections));
