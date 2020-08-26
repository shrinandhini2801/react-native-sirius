import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { withTheme } from 'react-native-paper';
import SCard from '@molecules/SCard';
import STitle from '@atoms/STitle';
import { SIZES } from '@styles/sizes';
import LinearGradient from 'react-native-linear-gradient';
import { renderMobileBodyLayout } from '@organisms/MobileLayout';
import { layout } from '@utils/Layout';
import TabletLayoutOne from '@organisms/tablet/TabletLayoutOne';
import { useMappedState } from 'redux-react-hook';

const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});
/**
 * Layout one for Top Stories
 * @param {props} props - Section data
 */

function LayoutOne(props) {
  const { section, isMobile, blackTitle } = props;
  const { colors } = props.theme;
  const { selectedTheme } = useMappedState(mappedState);
  const bgGradient =
    selectedTheme === 'light' ? ['#ffffff', '#f4f2ea'] : ['#121212', '#303030'];

  //TODO: Get info for this section
  //FIXME: Hack for now
  const adsContext = section.sectionurl ? section.sectionurl : '/home';

  return layout.isMobile ? (
    <LinearGradient colors={bgGradient}>
      <View>
        <STitle
          title={section.sectiontitle}
          size={SIZES.FONT_LARGE_2}
          paddingTop={section.sectiontitle ? SIZES.BASE * 2 : 0}
          paddingBottom={SIZES.BASE - 2}
          uppercase
          style={styles.container}
          titleColor={blackTitle ? colors.text : colors.sectionTitle}
          lineHeight={SIZES.FONT_LARGE_2}
        />

        {/* First Card  */}
        {section.assets && (
          <SCard
            story={section.assets[0]}
            key={section.assets[0].asset.storyuuid}
          />
        )}
        {renderMobileBodyLayout(section)}
      </View>
    </LinearGradient>
  ) : (
    <TabletLayoutOne section={section} blackTitle={blackTitle} />
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: SIZES.BASE,
    marginRight: SIZES.BASE
  },
  row: {
    flexDirection: 'row'
  },
  bottomPadding40: {
    paddingBottom: SIZES.PADDING
  }
});

export default withNavigation(withTheme(LayoutOne));
