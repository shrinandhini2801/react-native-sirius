import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { Card, withTheme } from 'react-native-paper';
import { AEM_ENDPOINT, ENVIRONMENT } from '@rootConfig/apiConfig';
import STitle from '@atoms/STitle';
import SectionLabel from '@atoms/SectionLabel';
import PublishedDate from '@atoms/PublishedDate';
import RoundImage from '@atoms/RoundImage';
import { TextSpaceAfterSquareImage, SIZES } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';

function OpinionAuthor(props) {
  const { navigation, story } = props;
  const { colors } = props.theme;
  const imagePath =
    story &&
    story.authors &&
    story.authors.length > 0 &&
    story.authors[0].photo &&
    story.authors[0].photo.url
      ? story.authors[0].photo.url
      : null;
  const imageURL = `${AEM_ENDPOINT}${imagePath}`;

  const headline = story.headline;
  const abstract = story.abstract;
  const articleUrl = story.absUrl ? story.absUrl : story.url;
  const storyuuid = story.storyuuid ? story.storyuuid : '';
  const sectionLabel =
    story && story.authors && story.authors[0] && story.authors[0].author
      ? story.authors[0].author
      : null;
  const lastmodifiedepoch = story.lastmodifiedepoch;
  const publishedepoch = story.publishedepoch;

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
          {
            backgroundColor: 'transparent'
          }
        ]}>
        <View
          style={{
            width:
              imagePath && imagePath.length > 0
                ? TextSpaceAfterSquareImage
                : '100%'
          }}>
          <SectionLabel
            label={sectionLabel}
            paddingBottom={SIZES.PADDING / 2}
            style={{
              paddingTop: 0,
              color: colors.text,
              fontFamily: customFonts.merriweatherSansRegular,
              fontWeight: 'normal'
            }}
          />
          <STitle
            fontFamily={customFonts.torstarDeckCondensedSemibold}
            title={headline}
            paddingTop={4}
            lineHeight={SIZES.LINE_HEIGHT + 5}
            size={SIZES.FONT_LARGE_1 - 4}
          />
          {
            <PublishedDate
              lastmodifiedepoch={lastmodifiedepoch}
              publishedepoch={publishedepoch}
            />
          }
        </View>
        {imagePath && imagePath.length > 0 && (
          <View style={styles.shadows}>
            <RoundImage url={imageURL} />
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
    marginBottom: SIZES.MARGIN,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  displayFlex: {
    flex: 1
  },
  shadows: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  }
});

export default withNavigation(withTheme(OpinionAuthor));
