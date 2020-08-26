import React from 'react';
import { Divider, withTheme } from 'react-native-paper';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import LinearGradient from 'react-native-linear-gradient';
import OpinionAuthor from '@molecules/OpinionAuthor';
import TabletOpinionAuthor from '@molecules/TabletOpinionAuthor';
import STitle from '@atoms/STitle';
import { SIZES, DeviceWidth } from '@styles/sizes';
import { layout } from '@utils/Layout';
import { FlatGrid } from 'react-native-super-grid';
import { useMappedState } from 'redux-react-hook';
/**
 * Layout Five for Options
 * @param {props} props - Section data
 */

const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});

function LayoutFive(props) {
  const { navigation, section } = props;
  const { colors } = props.theme;
  const tabletBackground = require('../../assets/images/tablet_opinion.png');
  const mobileBackground = require('../../assets/images/opinionsGraphics3x.png');
  const isMobile = layout.isMobile;
  const { selectedTheme } = useMappedState(mappedState);
  let gradientColorBg =
    selectedTheme === 'light'
      ? ['#ffffff', '#fffcfbf9', '#fefcfbf9']
      : ['#000', '#121212'];

  let innerGradient =
    selectedTheme === 'light' ? ['#ecf2f5', '#f2f2f2'] : ['#303030', '#121212'];

  //TODO: Get info for this section
  //FIXME: Hack for now
  const adsContext = section.sectionurl ? section.sectionurl : '/home';
  const renderItem = ({ item }) => (
    <TabletOpinionAuthor
      navigation={navigation}
      author={
        item.asset &&
        item.asset.authors &&
        item.asset.authors.length > 0 &&
        item.asset.authors[0]
      }
      item={item.asset}
    />
  );
  if (isMobile) {
    return (
      <LinearGradient colors={gradientColorBg}>
        <View>
          <ImageBackground
            source={mobileBackground}
            style={{
              width: DeviceWidth * 0.55,
              height: DeviceWidth * 0.55 * 0.6,
              position: 'absolute',
              top: 6,
              right: 0
            }}></ImageBackground>
          <STitle
            title={section && section.sectiontitle}
            size={SIZES.FONT_LARGE_2}
            paddingTop={SIZES.PADDING * 3}
            uppercase
            style={styles.container}
            lineHeight={SIZES.FONT_LARGE_2}
          />
          <LinearGradient
            colors={innerGradient}
            style={{
              paddingLeft: SIZES.PADDING,
              paddingRight: SIZES.PADDING,
              paddingTop: SIZES.PADDING * 2,
              margin: SIZES.PADDING,
              borderRadius: 4
            }}>
            <View>
              {section &&
                section.assets &&
                section.assets.length > 0 &&
                section.assets.map((story, index) => {
                  return (
                    <View
                      style={{
                        paddingBottom: SIZES.PADDING
                      }}
                      key={`${index}`}>
                      <OpinionAuthor
                        story={story && story.asset && story.asset}
                      />
                      {section.assets.length === index + 1 ? null : (
                        <Divider
                          style={{
                            borderWidth: 0.5,
                            borderColor: colors.adBox
                          }}
                        />
                      )}
                    </View>
                  );
                })}
            </View>
          </LinearGradient>
          {/** 
          <AdPlaceHolder adsContext={adsContext} />
        */}
        </View>
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient colors={gradientColorBg}>
        <View>
          <ImageBackground
            source={tabletBackground}
            style={{
              width: DeviceWidth * 0.45,
              height: DeviceWidth * 0.45 * 0.5,
              position: 'absolute',
              top: 0,
              right: 0,
              resizeMode: 'contain'
            }}
          />
          <STitle
            title={section && section.sectiontitle}
            size={SIZES.FONT_LARGE_2}
            paddingTop={SIZES.PADDING * 3}
            uppercase
            style={styles.container}
            lineHeight={SIZES.FONT_LARGE_2}
          />
          <Divider
            style={[styles.divider, { backgroundColor: colors.navNormal }]}
          />
          <LinearGradient colors={innerGradient} style={styles.linearGradient}>
            <FlatGrid
              itemDimension={layout.width * 0.4}
              items={section.assets}
              renderItem={story => renderItem(story)}
            />
          </LinearGradient>
          {/** 
          <AdPlaceHolder adsContext={adsContext} />
        */}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: SIZES.BASE,
    marginRight: SIZES.BASE
  },
  row: {
    flexDirection: 'row'
  },
  divider: {
    marginLeft: SIZES.BASE,
    marginRight: SIZES.BASE,
    height: 1
  },
  linearGradient: {
    margin: SIZES.PADDING,
    borderRadius: SIZES.BASE * 0.25,
    marginTop: SIZES.BASE * 1.5
  }
});

export default withNavigation(withTheme(LayoutFive));
