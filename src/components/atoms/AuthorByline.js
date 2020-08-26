import React from 'react';
import { View, Text, Image } from 'react-native';
import { customFonts } from '@styles/customFonts';
import { format } from 'date-fns';
import { localStrings } from '@utils/i18n';
import { AEM_ENDPOINT } from '@rootConfig/apiConfig';
import DateReadTime from '@atoms/DateReadTime';
import { withTheme } from 'react-native-paper';
import { SIZES, AUTHOR_COMPACT_VIEW_LIMIT, getFontSize } from '@styles/sizes';
import { formatDateforArticle, isOverOneYearOld } from '@utils/formatDate';

function getFormattedDate(lastmodifiedepoch, publishedepoch, publisheddate) {
  let isOldArticle = false;
  if (publishedepoch != undefined && publishedepoch > 0) {
    isOldArticle = isOverOneYearOld(publishedepoch);
    return {
      formattedDate: formatDateforArticle(publishedepoch),
      isOldArticle
    };
  } else if (lastmodifiedepoch != undefined && lastmodifiedepoch > 0) {
    isOldArticle = isOverOneYearOld(lastmodifiedepoch);
    return {
      formattedDate: formatDateforArticle(lastmodifiedepoch),
      isOldArticle
    };
  } else if (publisheddate) {
    const dateStr = publisheddate.replace(/ /g, ',');
    isOldArticle = isOverOneYearOld(dateStr);
    const shDate = format(new Date(dateStr), localStrings('shortDate'));
    return {
      formattedDate: shDate != 'Invalid Date' ? shDate : null,
      isOldArticle
    };
  }
}

function ConstructAuthorByline(props) {
  const styles = {
    authorImage: { height: 55, width: 55, borderRadius: 27 },
    container: {
      justifyContent: 'center',
      fontFamily: customFonts.merriweatherSansRegular
    },
    flex1: {
      flex: 1
    },
    commonFont: {
      fontSize: getFontSize(SIZES.FONT),
      lineHeight: getFontSize(22),
      letterSpacing: 0.32,
      fontFamily: customFonts.merriweatherSansRegular
    },
    italicFont: {
      fontSize: getFontSize(SIZES.FONT),
      lineHeight: getFontSize(22),
      letterSpacing: 0.32,
      fontFamily: customFonts.merriweatherSansRegular
    },
    authorName: {
      fontFamily: customFonts.merriweatherSansBlack
    }
  };

  const {
    style,
    authors,
    publisheddate,
    readTime,
    theme,
    lastmodifiedepoch,
    publishedepoch
  } = props;

  const date = getFormattedDate(
    lastmodifiedepoch,
    publishedepoch,
    publisheddate
  );
  const formattedDate = date.formattedDate;
  const isOldArticle = date.isOldArticle;
  let authorsLines = [];
  if (!authors.length && !formattedDate) {
    return null;
  }
  if (
    authors &&
    authors.length &&
    !(authors[0].author === '' && authors[0].credit === '')
  ) {
    const AUTHOR_SEPARATOR =
      authors.length < AUTHOR_COMPACT_VIEW_LIMIT ? '\n' : ', ';

    authorsLines.push(
      <Text
        key={'by'}
        style={[styles.italicFont, { color: theme.colors.text }]}>
        {localStrings('authorByLine.by')}{' '}
      </Text>
    );
    for (const index in authors) {
      const author = authors[index];
      if (author.author && author.author !== '') {
        const htmlRegex = /<([^>]+)>/gi;

        let isMorethanCompact = false;
        if (
          authors.length > 1 &&
          authors.length >= AUTHOR_COMPACT_VIEW_LIMIT &&
          parseInt(index) === authors.length - 1
        ) {
          isMorethanCompact = true;
        } else {
          isMorethanCompact = false;
        }

        const name = author.author.replace(htmlRegex, '').trim();

        {
          isMorethanCompact
            ? authorsLines.push(
                <Text
                  style={[styles.commonFont, { color: theme.colors.text }]}
                  key={`name${index}`}>
                  {' and '}
                </Text>
              )
            : false;
        }

        authorsLines.push(
          <Text
            style={[
              styles.commonFont,
              styles.authorName,
              { color: theme.colors.text }
            ]}
            key={`name${index}`}>
            {name}{' '}
          </Text>
        );
      }

      if (author.credit && author.credit !== '') {
        let credit = '';
        if (authors.length < AUTHOR_COMPACT_VIEW_LIMIT) {
          credit =
            parseInt(index) == authors.length - 1
              ? author.credit
              : `${author.credit}${AUTHOR_SEPARATOR}`;
        } else {
          credit =
            parseInt(index) == authors.length - 1 ||
            parseInt(index) == authors.length - 2
              ? null
              : `${AUTHOR_SEPARATOR}`;
        }

        authorsLines.push(
          <Text
            key={`credit${index}`}
            style={[styles.commonFont, { color: theme.colors.text }]}>
            {credit}
          </Text>
        );
      }
    }
  }
  let displayDate = readTime ? (
    <DateReadTime
      style={styles.commonFont}
      formattedDate={formattedDate}
      readTime={readTime}
      oldArticleWarning={isOldArticle}
    />
  ) : (
    false
  );

  let authorImageUrl = null;
  if (
    authors &&
    authors.length &&
    authors[0] &&
    authors[0].photo &&
    authors[0].photo.url
  ) {
    authorImageUrl = AEM_ENDPOINT + authors[0].photo.url;
  }
  if (authors.length > 1) {
    return (
      <View style={[style, styles.container]}>
        {authorsLines.length > 0 ? <Text>{authorsLines}</Text> : false}
        {displayDate}
      </View>
    );
  } else {
    return (
      <View style={[style, { flexDirection: 'row', paddingBottom: 5 }]}>
        {authorImageUrl !== null ? (
          <View style={{ justifyContent: 'center', marginRight: 15 }}>
            <Image
              source={{ uri: authorImageUrl }}
              resizeMode={'cover'}
              style={styles.authorImage}
            />
          </View>
        ) : null}
        <View style={[styles.container, styles.flex1]}>
          {authorsLines.length > 0 ? <Text>{authorsLines}</Text> : false}
          {displayDate}
        </View>
      </View>
    );
  }
}

function AuthorByline(props) {
  const styles = {
    line: {
      borderWidth: 0.5,
      marginTop: SIZES.BASE,
      marginBottom: SIZES.MARGIN * 2,
      marginHorizontal: SIZES.PaddingHorizontal
    }
  };
  let line = (
    <View style={[styles.line, { borderColor: props.theme.colors.disabled }]} />
  );
  return (
    <View>
      {ConstructAuthorByline(props)}
      {line}
    </View>
  );
}

export default withTheme(AuthorByline);
