import React from 'react';
import { withTheme, Paragraph } from 'react-native-paper';
import { customFonts } from '@styles/customFonts';
import { SIZES, HalfCardImageWidth, getFontSize } from '@styles/sizes';
import { fromUnixTime, format } from 'date-fns';
import { formatDateForAggregation } from '@utils/formatDate';
import { localStrings } from '@utils/i18n';

function PublishedDate(props) {
  const {
    lastmodifiedepoch,
    publishedepoch,
    half,
    paddingBottom,
    paddingTop,
    style,
    publishedDate
  } = props;
  let date = '';
  if (publishedepoch != undefined && publishedepoch > 0) {
    date = formatDateForAggregation(publishedepoch);
  } else if (lastmodifiedepoch != undefined && lastmodifiedepoch > 0) {
    date = formatDateForAggregation(lastmodifiedepoch);
  } else if (publishedDate) {
    const dateStr = publishedDate.replace(/ /g, ',');
    const shDate = format(new Date(dateStr), localStrings('shortDate'));
    date = shDate != 'Invalid Date' ? shDate : null;
  }

  if (date) {
    return (
      <Paragraph
        style={[
          {
            fontFamily: customFonts.merriweatherSansLight,
            fontSize: getFontSize(SIZES.FONT - 1),
            width: half ? HalfCardImageWidth - 32 : '100%',
            paddingTop: paddingTop ? paddingTop : 0,
            paddingBottom: paddingBottom ? paddingBottom : 0
          },
          { ...style }
        ]}>
        {date.toUpperCase()}
      </Paragraph>
    );
  } else {
    return null;
  }
}

export default PublishedDate;
