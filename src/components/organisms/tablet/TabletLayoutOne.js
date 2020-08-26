import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { withTheme, Divider } from 'react-native-paper';
import { AEM_ENDPOINT, ENVIRONMENT } from '@rootConfig/apiConfig';
import SArticle from '@atoms/SArticle';
import Image from '@atoms/Image';
import STitle from '@atoms/STitle';
import { SIZES } from '@styles/sizes';
import LinearGradient from 'react-native-linear-gradient';
import SectionLabel from '@atoms/SectionLabel';
import { customFonts } from '@styles/customFonts';
import PublishedDate from '@atoms/PublishedDate';
import { renderTabletBodyLayout } from '@organisms/TabletBodyLayout';
import { useMappedState } from 'redux-react-hook';

/**
 * Layout one for Top Stories
 * @param {props} props - Section data
 */

const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});

function LayoutOne(props) {
  const { navigation, section, blackTitle } = props;
  const imageURL = section.assets[0].asset.image.url
    ? `${AEM_ENDPOINT}${section.assets[0].asset.image.url}`
    : null;
  const { colors } = props.theme;
  const story = section.assets[0];
  const { selectedTheme } = useMappedState(mappedState);
  const bgGradient =
    selectedTheme === 'light' ? ['#ffffff', '#f4f2ea'] : ['#000', '#333333'];
  const sectionLabel =
    story.asset.breadcrumbs &&
    story.asset.breadcrumbs.length > 0 &&
    story.asset.breadcrumbs[story.asset.breadcrumbs.length - 1].label;
  const headline = story.asset.headline;
  const abstract = story.asset.abstract;
  const publishedDate = story.asset.publishdate
    ? story.asset.publishdate
    : null;
  const lastmodifiedepoch = story.asset.lastmodifiedepoch;
  const publishEdepochDate = story.asset.publishedepoch;
  const articleUrl = story.asset.absUrl ? story.asset.absUrl : story.asset.url;
  const storyuuid = story.asset.storyuuid;
  //TODO: Get info for this section
  //FIXME: Hack for now
  const adsContext = section.sectionurl ? section.sectionurl : '/home';

  return (
    <LinearGradient colors={bgGradient}>
      <STitle
        title={section.sectiontitle}
        size={SIZES.FONT_LARGE_2}
        paddingTop={section.sectiontitle ? SIZES.BASE * 2 : 0}
        paddingBottom={SIZES.BASE - 12}
        uppercase
        style={styles.container}
        titleColor={blackTitle ? colors.text : colors.sectionTitle}
        lineHeight={SIZES.FONT_LARGE_2}
      />
      <Divider
        style={[
          styles.divider,
          {
            borderColor: blackTitle
              ? colors.text
              : selectedTheme === 'light'
              ? colors.cardBg
              : colors.secondaryText
          }
        ]}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('Article', {
            url: articleUrl,
            storyuuid: storyuuid
          });
        }}
        style={styles.cardContainer}>
        {imageURL ? (
          <Image tabletHalfScreenHeader url={imageURL} withMargin />
        ) : (
          <Image tabletHalfScreenHeader showPlaceholder withMargin />
        )}
        <View style={styles.textContentContainer}>
          <SectionLabel letterSpacing={1.2} label={sectionLabel} />
          <STitle
            semiHalf
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
          {publishedDate ? (
            <PublishedDate
              lastmodifiedepoch={lastmodifiedepoch}
              publishedepoch={publishEdepochDate}
              paddingTop={SIZES.PADDING / 3}
              color={colors.publishedDate}
            />
          ) : null}
        </View>
      </TouchableOpacity>
      {renderTabletBodyLayout(section)}
    </LinearGradient>
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
  },
  textContentContainer: {
    width: '40%',
    paddingHorizontal: SIZES.PADDING
  },
  cardContainer: {
    marginHorizontal: SIZES.BASE,
    flexDirection: 'row',
    paddingTop: SIZES.BASE * 2,
    paddingBottom: SIZES.BASE * 2
  },
  divider: {
    marginLeft: SIZES.PADDING,
    marginRight: SIZES.PADDING,
    borderWidth: 0.5
  }
});

export default withNavigation(withTheme(LayoutOne));
