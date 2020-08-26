import React from 'react';
import { AEM_ENDPOINT, ENVIRONMENT } from '@rootConfig/apiConfig';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { Card, withTheme, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { SIZES, FullBleedHeight } from '@styles/sizes';
import BackgroundImage from '@atoms/BackgroundImage';
import STitle from '@atoms/STitle';
import SArticle from '@atoms/SArticle';
import SectionLabel from '@atoms/SectionLabel';
import PublishedDate from '@atoms/PublishedDate';
import { customFonts } from '@styles/customFonts';
import { layout } from '@utils/Layout';

function FullBleedCard(props) {
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
  const publishedDate = story.asset.publisheddate;

  let bgImageProps = {
    showPlaceholder: !imageURL,
    url: imageURL,
    style: { height: FullBleedHeight }
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
      style={{
        backgroundColor: colors.background,
        marginBottom: SIZES.PADDING * 2
      }}>
      <BackgroundImage {...bgImageProps}>
        <LinearGradient
          colors={['rgba(0,0,0, 0.5)', 'rgba(0,0,0,0.5)']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: FullBleedHeight
          }}></LinearGradient>
        <View style={styles.pushAtBottom}>
          <View style={styles.container}>{props.children}</View>
          <View style={styles.container}>
            <SectionLabel
              uppercase
              label={sectionLabel}
              paddingTop={SIZES.PADDING}
              paddingBottom={SIZES.PADDING / 2}
              style={{ color: colors.whiteText }}
            />
            <STitle
              shadows
              style={{ color: colors.whiteText }}
              title={headline}
              paddingTop={SIZES.PADDING / 3}
              paddingBottom={layout.isMobile ? SIZES.PADDING : SIZES.MINIFONT}
              size={layout.isMobile ? SIZES.FONT * 2 : SIZES.FONT_LARGE_1}
              fontFamily={customFonts.torstarDisplayBlack}
              lineHeight={
                layout.isMobile ? SIZES.FONT_LARGE_1 : SIZES.FONT_LARGE_2
              }
            />
            {abstract && !layout.isMobile ? (
              <SArticle
                title={abstract}
                size={SIZES.BASE}
                paddingBottom={SIZES.FONT}
                lineHeight={SIZES.BASE + 4}
                fontFamily={customFonts.torstarDeckBold}
                color={colors.whiteText}
              />
            ) : null}
            {
              <PublishedDate
                lastmodifiedepoch={lastmodifiedepoch}
                publishedepoch={publishedepoch}
                publishedDate={publishedDate}
                paddingTop={SIZES.FONT}
                paddingBottom={SIZES.PADDING}
                style={{
                  color: colors.whiteText
                }}
              />
            }
          </View>
        </View>
      </BackgroundImage>
    </TouchableOpacity>
  );
}

Card.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  pushAtBottom: {
    flex: 1,
    justifyContent: 'space-between'
  },
  container: {
    marginLeft: layout.isMobile ? SIZES.BASE : SIZES.BASE * 2,
    marginRight: layout.isMobile ? SIZES.BASE : SIZES.BASE * 2,
    paddingBottom: layout.isMobile ? 0 : SIZES.PADDING
  }
});

export default withNavigation(withTheme(FullBleedCard));
