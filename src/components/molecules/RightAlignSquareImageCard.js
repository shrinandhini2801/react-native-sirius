import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { Card, withTheme } from 'react-native-paper';
import { AEM_ENDPOINT, ENVIRONMENT } from '@rootConfig/apiConfig';
import STitle from '@atoms/STitle';
import SectionLabel from '@atoms/SectionLabel';
import PublishedDate from '@atoms/PublishedDate';
import Image from '@atoms/Image';
import { TextSpaceAfterSquareImage, SIZES } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';
import { layout } from '@utils/Layout';

function RightAlignSquareImageCard(props) {
  const { navigation, story, isHalf, isTwoThird } = props;
  const { colors } = props.theme;
  const imagePath = story.asset.image.url;
  const imageURL = imagePath ? `${AEM_ENDPOINT}${imagePath}` : null;

  const headline = story.asset.headline;
  const abstract = story.asset.abstract;
  const articleUrl = story.asset.absUrl ? story.asset.absUrl : story.asset.url;
  const storyuuid = story.asset.storyuuid;
  const sectionLabel =
    story.asset.breadcrumbs &&
    story.asset.breadcrumbs.length > 0 &&
    story.asset.breadcrumbs[story.asset.breadcrumbs.length - 1].label;
  const lastmodifiedepoch = story.asset.lastmodifiedepoch;
  const publishedepoch = story.asset.publishedepoch;

  const computeCardWidth = imageLength => {
    if (layout.isMobile) {
      return imageLength > 0 ? TextSpaceAfterSquareImage : '100%';
    } else {
      if (imageLength > 0) {
        return isHalf && !isTwoThird
          ? SIZES.TAB_RA_HALFCARD_WIDTH
          : !isHalf && !isTwoThird
          ? SIZES.TAB_RA_FULLCARD_WIDTH
          : !isHalf && isTwoThird
          ? SIZES.TAB_RA_TWOTHIRDCARD_WIDTH
          : '100%';
      } else {
        return '100%';
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Article', {
          url: articleUrl,
          storyuuid: storyuuid
        });
      }}>
      <View
        style={[
          styles.card,
          styles.container,
          {
            backgroundColor: 'transparent'
          }
        ]}>
        <View
          style={{
            width: computeCardWidth(imagePath.length)
          }}>
          <SectionLabel
            label={sectionLabel}
            paddingTop={0}
            style={{ paddingTop: 0 }}
          />
          <STitle
            fontFamily={
              layout.isMobile
                ? customFonts.torstarDeckBold
                : customFonts.torstarDeckCondensedSemibold
            }
            title={headline}
            paddingTop={4}
            size={layout.isMobile ? SIZES.BASE + 2 : SIZES.HALF_CARD_FONT}
            style={
              layout.isMobile && {
                fontWeight: Platform.OS === 'ios' ? 'bold' : '800'
              }
            }
            lineHeight={!layout.isMobile && SIZES.LINE_HEIGHT + 2}
          />
          <PublishedDate
            lastmodifiedepoch={lastmodifiedepoch}
            publishedepoch={publishedepoch}
          />
        </View>
        {imagePath.length > 0 && (
          <View style={styles.shadows}>
            <Image
              url={imageURL}
              bigSquare={!layout.isMobile && !isHalf && !isTwoThird}
              square={layout.isMobile || isHalf || isTwoThird}
              style={{ paddingRight: SIZES.PADDING }}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

Card.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: SIZES.MARGIN * 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    marginLeft: SIZES.MARGIN,
    marginRight: SIZES.MARGIN
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

export default withNavigation(withTheme(RightAlignSquareImageCard));
