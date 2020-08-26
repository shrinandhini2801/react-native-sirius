import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { customFonts } from '@styles/customFonts';
import { withTheme } from 'react-native-paper';
import { extractAuthorInitials } from '@utils/extractInitials';
import moment from 'moment';
import { AEM_ENDPOINT } from '@rootConfig/apiConfig';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from '@react-navigation/compat';
import { SIZES } from '@styles/sizes';
import DefaultTheme from '@styles/defaultTheme';
import PublishedDate from '@components/atoms/PublishedDate';
function TabletOpinionAuthor(props) {
  const { author, item, navigation, theme } = props;
  const colors = theme.colors.opinionInitialsGradient;
  const storyuuid = item.storyuuid ? item.storyuuid : '';
  const articleUrl = item.absUrl ? item.absUrl : item.url;
  const lastmodifiedepoch = item.lastmodifiedepoch;
  const publishedepoch = item.publishedepoch;
  return (
    <TouchableOpacity
      style={{
        borderBottomColor: theme.colors.adBox,
        borderBottomWidth: 1,
        flex: 1
      }}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate('Article', {
          url: articleUrl,
          storyuuid: storyuuid
        });
      }}>
      <>
        {item ? (
          <View style={styles.opinionPieceContainer}>
            <View style={styles.textWrapper}>
              <Text style={[styles.authorName, { color: theme.colors.text }]}>
                {author.author}
              </Text>
              <Text style={[styles.abstract, { color: theme.colors.text }]}>
                {item.headline}
              </Text>
              <PublishedDate
                lastmodifiedepoch={lastmodifiedepoch}
                publishedepoch={publishedepoch}
                style={{ color: theme.colors.text }}
              />
            </View>
            <View style={styles.imageWrapper}>
              {author.photo && author.photo.url ? (
                <Image
                  style={styles.authorImage}
                  source={{ uri: AEM_ENDPOINT + author.photo.url }}
                />
              ) : author && author.author ? (
                <LinearGradient colors={colors} style={styles.initialsIcon}>
                  <Text style={styles.initialsText}>
                    {extractAuthorInitials(author.author)}
                  </Text>
                </LinearGradient>
              ) : null}
            </View>
          </View>
        ) : null}
      </>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  opinionPieceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: SIZES.PADDING * 2,
    paddingHorizontal: SIZES.PADDING
  },
  initialsIcon: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  initialsText: {
    textAlign: 'center',
    color: DefaultTheme.colors.whiteText,
    fontSize: SIZES.FONT_LARGE_1,
    fontFamily: customFonts.torstarCompressedBold
  },
  authorImage: {
    height: 80,
    width: 80,
    borderRadius: 40
  },
  authorName: {
    fontFamily: customFonts.merriweatherSansBold,
    fontSize: SIZES.FONT,
    letterSpacing: 1.09,
    textTransform: 'uppercase'
  },
  abstract: {
    flex: 1,
    fontFamily: customFonts.torstarTextRoman,
    marginTop: SIZES.MARGIN * 0.75,
    marginRight: SIZES.MARGIN * 0.5,
    fontSize: SIZES.FONT * 1.5,
    lineHeight: SIZES.LINE_HEIGHT
  },
  textWrapper: {
    width: '75%'
  },
  imageWrapper: {
    width: '25%',
    flex: 1,
    marginTop: SIZES.BASE
  },
  date: {
    marginTop: SIZES.BASE * 0.75,
    fontFamily: customFonts.merriweatherSansLight,
    fontSize: SIZES.BASE * 0.75
  }
});
export default withNavigation(withTheme(TabletOpinionAuthor));
