import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { Card, withTheme, Divider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import RaisedCard from '@molecules/RaisedCard';
import STitle from '@atoms/STitle';
import { SIZES } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';
import { layout } from '@utils/Layout';
import { renderTabletBodyLayout } from '@organisms/TabletBodyLayout';
import { renderMobileBodyLayout } from '@organisms/MobileLayout';

/**
 * Layout Two for Special
 * @param {props} props - Section data
 */

function LayoutFour(props) {
  const { section } = props;
  const { colors } = props.theme;
  //TODO: Get info for this section
  //FIXME: Hack for now
  const adsContext = section.sectionurl ? section.sectionurl : '/home';
  const bgGradient = props.theme.dark
    ? ['#121212', '#303030']
    : ['#ffffff', '#f4f2ea'];

  return (
    <LinearGradient colors={bgGradient} style={{ marginTop: SIZES.BASE }}>
      <STitle
        title={section.sectiontitle}
        size={SIZES.FONT_LARGE_2}
        paddingTop={section.sectiontitle ? SIZES.BASE : 0}
        paddingBottom={layout.isMobile ? SIZES.BASE - 2 : 5}
        uppercase
        style={styles.container}
        titleColor={colors.text}
        fontFamily={customFonts.torstarDisplayBlack}
        lineHeight={SIZES.FONT_LARGE_2}
      />
      {!layout.isMobile && (
        <Divider
          style={[
            styles.container,
            {
              borderColor: colors.text,
              borderWidth: 0.5,
              marginBottom: SIZES.BASE * 2
            }
          ]}
        />
      )}
      {/* First Card  */}
      {section.assets && (
        <RaisedCard
          isTabLayoutFour={!layout.isMobile}
          story={section.assets[0]}
          key={section.assets[0].asset.storyuuid}
        />
      )}
      {layout.isMobile
        ? renderMobileBodyLayout(section)
        : renderTabletBodyLayout(section)}
    </LinearGradient>
  );
}

Card.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    marginLeft: SIZES.BASE,
    marginRight: SIZES.BASE
  }
});

export default withNavigation(withTheme(LayoutFour));
