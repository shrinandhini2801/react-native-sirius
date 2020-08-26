import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { Card, withTheme } from 'react-native-paper';
import { AEM_ENDPOINT, ENVIRONMENT } from '@rootConfig/apiConfig';
import { SIZES } from '@styles/sizes';
import STitle from '@atoms/STitle';
import SArticle from '@atoms/SArticle';
import SectionLabel from '@atoms/SectionLabel';
import PublishedDate from '@atoms/PublishedDate';
import Image from '@atoms/Image';
import { customFonts } from '@styles/customFonts';

function SCard(props) {
  const { navigation, story } = props;
  const { colors } = props.theme;

  const imageURL = story.asset.image.url
    ? `${AEM_ENDPOINT}${story.asset.image.url}`
    : null;

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
  const publishedDate = story.asset.publishdate
    ? story.asset.publishdate
    : null;

  let imageProps = {
    showPlaceholder: !imageURL,
    url: imageURL
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate('Article', {
          url: articleUrl,
          storyuuid: storyuuid
        });
      }}
      style={[
        styles.card,
        styles.container,
        { backgroundColor: 'transparent' }
      ]}>
      <View style={styles.shadows}>
        <Image {...imageProps} withMargin />
      </View>
      <SectionLabel
        letterSpacing={1.2}
        label={sectionLabel}
        paddingTop={SIZES.PADDING * 1.5}
        paddingBottom={0}
      />
      <STitle
        title={headline}
        paddingTop={SIZES.PADDING / 2}
        size={SIZES.FONT * 2}
        lineHeight={SIZES.BASE * 1.8}
        fontFamily={customFonts.torstarDisplayBlack}
      />
      {!!abstract && (
        <SArticle
          title={abstract}
          paddingTop={SIZES.PADDING / 4}
          size={SIZES.BASE}
          lineHeight={SIZES.BASE + 4}
          color={colors.secondaryText}
        />
      )}
      <PublishedDate
        lastmodifiedepoch={lastmodifiedepoch}
        publishedepoch={publishedepoch}
        paddingTop={SIZES.PADDING / 3}
        color={colors.publishedDate}
      />
    </TouchableOpacity>
  );
}

Card.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.BASE * 2
  },
  container: {
    marginLeft: SIZES.BASE,
    marginRight: SIZES.BASE
  },
  shadows: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65
  }
});

export default withNavigation(withTheme(SCard));
