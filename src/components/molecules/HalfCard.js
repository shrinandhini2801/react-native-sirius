import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Platform
} from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { Card, withTheme } from 'react-native-paper';
import { SIZES } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';
import { AEM_ENDPOINT, ENVIRONMENT } from '@rootConfig/apiConfig';
import STitle from '@atoms/STitle';
import SectionLabel from '@atoms/SectionLabel';
import PublishedDate from '@atoms/PublishedDate';
import Image from '@atoms/Image';
import { layout } from '@utils/Layout';

function HalfCard(props) {
  const { navigation, story, semiHalf } = props;
  const { colors } = props.theme;

  const imageURL = story.asset.image.url
    ? `${AEM_ENDPOINT}${story.asset.image.url}`
    : null;

  const headline = story.asset.headline;
  const articleUrl = story.asset.absUrl ? story.asset.absUrl : story.asset.url;
  const storyuuid = story.asset.storyuuid;
  const sectionLabel =
    story.asset.breadcrumbs && story.asset.breadcrumbs.length > 0
      ? story.asset.breadcrumbs[story.asset.breadcrumbs.length - 1].label
      : story.asset.labelkicker;
  const lastmodifiedepoch = story.asset.lastmodifiedepoch;
  const publishedepoch = story.asset.publishedepoch;
  let imageProps = {
    showPlaceholder: !imageURL,
    url: imageURL,
    half: layout.isMobile,
    semiHalf: !layout.isMobile && semiHalf
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Article', {
          url: articleUrl,
          storyuuid: storyuuid
        });
      }}
      style={{ backgroundColor: colors.background }}>
      <View style={styles.card}>
        <View style={styles.shadows}>
          <Image {...imageProps} />
        </View>
        <SectionLabel label={sectionLabel} paddingTop={SIZES.PADDING * 1.2} />
        <STitle
          title={headline}
          fontFamily={
            layout.isMobile
              ? customFonts.torstarDeckBold
              : customFonts.torstarDecSemiBold
          }
          paddingTop={4}
          size={SIZES.BASE + 2}
          half={layout.isMobile}
          semiHalf={!layout.isMobile && semiHalf}
          lineHeight={SIZES.BASE * 1.5}
          style={
            !semiHalf && { fontWeight: Platform.OS === 'ios' ? 'bold' : '800' }
          }
        />
        <PublishedDate
          lastmodifiedepoch={lastmodifiedepoch}
          publishedepoch={publishedepoch}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

Card.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.BASE,
    marginLeft: SIZES.MARGIN
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

export default withNavigation(withTheme(HalfCard));
