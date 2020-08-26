import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import ArticleSectionLabel from '@molecules/ArticleSectionLabel';
import { withTheme, Text } from 'react-native-paper';
import { customFonts } from '@styles/customFonts';
import { SIZES, getFontSize } from '@styles/sizes';
import STitle from '@atoms/STitle';
import { layout } from '@utils/Layout';

function renderHeadline(orgHeadline) {
  const isMobile = layout.isMobile;
  let headline = null;
  if (orgHeadline) {
    headline = (
      <STitle
        fontFamily={customFonts.torstarDeckBold}
        title={orgHeadline}
        size={isMobile ? SIZES.FONT_LARGE_1 : SIZES.TABLET_HEADLINE}
        paddingTop={5}
        lineHeight={isMobile ? SIZES.LINE_HEIGHT + 10 : SIZES.LINE_HEIGHT * 2}
        style={styles.title}
        paddingHorizontal={SIZES.PaddingHorizontal}
        fontWeight={isMobile ? '400' : '800'}
      />
    );
  }
  return headline;
}

function ArticleHeader(props) {
  const data = props.data;
  const trustLabel = data.trustlabel ? data.trustlabel : null;
  /**
   * label display logic
   * If its not equal to trust label - show
   * If its same as trust lable - show the previous array element in breadcrumb
   * Case sensitivity & pluralization are considered in determining label display.
   */
  const getLabel = () => {
    if (
      data.breadcrumbs &&
      data.breadcrumbs.length !== 0 &&
      data.breadcrumbs.slice(-1)[0]
    ) {
      let l = data.breadcrumbs.slice(-1)[0];
      if (trustLabel) {
        if (data.breadcrumbs.length > 1) {
          return l.label.toLowerCase() === `${trustLabel.name.toLowerCase()}s`
            ? null
            : l.label.toLowerCase() === trustLabel.name.toLowerCase()
            ? data.breadcrumbs.slice(-2)[0] && data.breadcrumbs.slice(-2)[0]
            : l;
        } else {
          return l.label.toLowerCase() === trustLabel.name.toLowerCase() ||
            l.label.toLowerCase() === `${trustLabel.name.toLowerCase()}s`
            ? null
            : l;
        }
      } else {
        return l;
      }
    }
  };
  const label = getLabel();
  return (
    <View style={styles.container}>
      {(label || trustLabel) && (
        <ArticleSectionLabel
          style={styles.labelRow}
          label={label}
          trustLabel={trustLabel}
        />
      )}
      {renderHeadline(data.headline)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5
  },

  labelRow: {
    paddingBottom: 16
  },

  headline: {
    paddingHorizontal: SIZES.PaddingHorizontal
  },

  title: {
    fontFamily: customFonts.torstarDeckCondensedBold,
    letterSpacing: -0.3
  }
});

export default withTheme(ArticleHeader);
