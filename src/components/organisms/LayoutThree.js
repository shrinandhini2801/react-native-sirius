import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { Card } from 'react-native-paper';
import FullbleedCard from '@molecules/FullbleedCard';
import STitle from '@atoms/STitle';
import { SIZES } from '@styles/sizes';
import { layout } from '@utils/Layout';
import { withTheme, Divider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { renderTabletBodyLayout } from '@organisms/TabletBodyLayout';
import { renderMobileBodyLayout } from '@organisms/MobileLayout';
import { useMappedState } from 'redux-react-hook';

/**
 * Layout Three is full bleed for Life, Food, Travel, fashion
 * @param {props} props - Section data
 */

const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});

function LayoutThree(props) {
  const { section } = props;
  const { colors } = props.theme;
  const { selectedTheme } = useMappedState(mappedState);
  const bgGradient =
    selectedTheme === 'light' ? ['#ffffff', '#f4f2ea'] : ['#121212', '#303030'];
  //TODO: Get info for this section
  //FIXME: Hack for now
  const adsContext = section.sectionurl ? section.sectionurl : '/home';

  return (
    <LinearGradient colors={bgGradient}>
      {/* First Card | Main card */}
      {section.assets && (
        <FullbleedCard
          story={section.assets[0]}
          key={section.assets[0].asset.storyuuid}>
          <STitle
            uppercase
            shadows
            title={section.sectiontitle}
            size={SIZES.FONT_LARGE_2}
            paddingTop={section.sectiontitle ? SIZES.BASE * 2 : 0}
            paddingBottom={layout.isMobile ? 16 : 3}
            style={{ color: colors.whiteText }}
            lineHeight={SIZES.FONT_LARGE_2}
          />
          {!layout.isMobile && !!section.sectiontitle && (
            <Divider
              style={{ borderColor: colors.whiteText, borderWidth: 0.5 }}
            />
          )}
        </FullbleedCard>
      )}
      {/* Body content*/}
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
  extraMarginTop: {
    marginTop: SIZES.BASE * 2
  }
});

export default withNavigation(withTheme(LayoutThree));
