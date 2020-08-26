import React, { useContext } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { Card, withTheme } from 'react-native-paper';
import { AEM_ENDPOINT, ENVIRONMENT } from '@rootConfig/apiConfig';
import { SIZES, RaisedCardImageHeight } from '@styles/sizes';
import STitle from '@atoms/STitle';
import SArticle from '@atoms/SArticle';
import SectionLabel from '@atoms/SectionLabel';
import PublishedDate from '@atoms/PublishedDate';
import Image from '@atoms/Image';
import LinearGradient from 'react-native-linear-gradient';
import { layout } from '@utils/Layout';
import { customFonts } from '@styles/customFonts';
import { useMappedState } from 'redux-react-hook';
import { customStyles } from '@styles/customStyles';

const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});

function RaisedCard(props) {
  const { navigation, story, isTabLayoutFour } = props;
  const { colors } = props.theme;
  const { selectedTheme } = useMappedState(mappedState);

  let gradient = colors.raisedCardGradient;

  const imageURL = story.asset.image.url
    ? `${AEM_ENDPOINT}${story.asset.image.url}`
    : null;

  const headline = story.asset.headline;
  const articleUrl = story.asset.absUrl ? story.asset.absUrl : story.asset.url;
  const storyuuid = story.asset.storyuuid;
  const sectionLabel =
    story.asset.breadcrumbs &&
    story.asset.breadcrumbs.length > 0 &&
    story.asset.breadcrumbs[story.asset.breadcrumbs.length - 1].label;
  const lastmodifiedepoch = story.asset.lastmodifiedepoch;
  const publishedepoch = story.asset.publishedepoch;
  const abstract = story.asset.abstract;
  let imageProps = {
    showPlaceholder: !imageURL,
    url: imageURL,
    tabletOneThirdScreen: true,
    style: {
      height: RaisedCardImageHeight / 2,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    }
  };
  let fontScaleRatio = imageProps.style.height / headline.length;
  const { textColor, hasBorder } = customStyles;

  return isTabLayoutFour ? (
    <Card
      onPress={() => {
        navigation.navigate('Article', {
          url: articleUrl,
          storyuuid: storyuuid
        });
      }}
      style={[
        styles.card,
        styles.container,
        {
          borderWidth: hasBorder ? 0.6 : 0,
          borderColor: colors.primary,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4
        }
      ]}
      elevation={6}>
      <View style={[styles.flexRow]}>
        <Image {...imageProps} />
        <LinearGradient
          colors={gradient}
          style={{
            width: layout.width * 0.375 - SIZES.PADDING * 2,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: hasBorder ? 0.8 : 0,
              borderColor: colors.primary,
              paddingHorizontal: SIZES.PADDING,
              paddingBottom: SIZES.PADDING
            }}>
            {sectionLabel && (
              <SectionLabel
                label={sectionLabel}
                paddingTop={SIZES.PADDING}
                paddingBottom={SIZES.PADDING / 2}
                style={{
                  color: textColor
                }}
              />
            )}
            <STitle
              fontFamily={customFonts.torstarDisplayBlack}
              title={headline}
              paddingTop={sectionLabel ? 0 : SIZES.PADDING}
              size={
                fontScaleRatio > 1.7 && fontScaleRatio < 2.22
                  ? SIZES.BASE + 3
                  : fontScaleRatio > 1 && fontScaleRatio < 1.7
                  ? SIZES.BASE + 1
                  : fontScaleRatio > 2.22 && fontScaleRatio < 3.1
                  ? SIZES.BASE + 2
                  : fontScaleRatio < 1.58
                  ? SIZES.BASE
                  : SIZES.FONT * 2
              }
              style={{ color: textColor }}
              lineHeight={
                fontScaleRatio > 1.5 && fontScaleRatio < 2.22
                  ? SIZES.LINE_HEIGHT + 2
                  : fontScaleRatio > 2.22 && fontScaleRatio < 3.1
                  ? SIZES.LINE_HEIGHT + 4
                  : fontScaleRatio < 1.5
                  ? SIZES.LINE_HEIGHT
                  : SIZES.LINE_HEIGHT + 8
              }
            />
            {!!abstract && fontScaleRatio > 4.1 && (
              <SArticle
                title={abstract}
                numberOfLines={fontScaleRatio > 5 ? 6 : 3}
                paddingTop={SIZES.PADDING / 4}
                size={SIZES.BASE}
                lineHeight={SIZES.LINE_HEIGHT}
                color={textColor}
              />
            )}
            <PublishedDate
              lastmodifiedepoch={lastmodifiedepoch}
              publishedepoch={publishedepoch}
              paddingTop={SIZES.PADDING}
              style={{ color: textColor }}
            />
          </View>
        </LinearGradient>
      </View>
    </Card>
  ) : (
    <Card
      onPress={() => {
        navigation.navigate('Article', {
          url: articleUrl,
          storyuuid: storyuuid
        });
      }}
      style={[
        {
          borderWidth: hasBorder ? 0.6 : 0,
          borderColor: colors.primary,
          borderRadius: 4
        },
        styles.card,
        styles.container
      ]}
      elevation={6}>
      <Image
        url={imageURL}
        withMargin
        raisedCardWithBorder={hasBorder}
        style={{
          height: RaisedCardImageHeight,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }}
      />

      <LinearGradient
        colors={gradient}
        style={{ borderBottomRightRadius: 4, borderBottomLeftRadius: 4 }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.PADDING,
            paddingBottom: SIZES.PADDING,
            borderWidth: hasBorder ? 0.8 : 0,
            borderColor: colors.primary
          }}>
          <SectionLabel
            label={sectionLabel}
            paddingTop={SIZES.PADDING}
            paddingBottom={SIZES.PADDING / 2}
            style={{ color: textColor }}
          />
          <STitle
            title={headline}
            paddingTop={SIZES.PADDING / 3}
            size={SIZES.FONT * 2}
            style={{ color: textColor }}
            lineHeight={SIZES.LINE_HEIGHT + 8}
          />
          {!!abstract && (
            <SArticle
              title={abstract}
              paddingTop={SIZES.PADDING / 4}
              size={SIZES.BASE}
              lineHeight={SIZES.LINE_HEIGHT}
              color={textColor}
            />
          )}
          <PublishedDate
            lastmodifiedepoch={lastmodifiedepoch}
            publishedepoch={publishedepoch}
            paddingTop={SIZES.PADDING}
            style={{ color: textColor }}
          />
        </View>
      </LinearGradient>
    </Card>
  );
}

Card.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.BASE * 2
  },
  flexRow: { flexDirection: 'row' },
  container: {
    marginLeft: SIZES.BASE,
    marginRight: SIZES.BASE
  }
});

export default withNavigation(withTheme(RaisedCard));
