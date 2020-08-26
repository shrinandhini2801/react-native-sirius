import React from 'react';
import { Text, View, Platform } from 'react-native';
import { localStrings } from '@utils/i18n';
import { withTheme } from 'react-native-paper';
import { SIZES, getFontSize } from '@styles/sizes';
import GetIcon from '@atoms/GetIcon';
import { customFonts } from '@styles/customFonts';

function DateReadTime(props) {
  const { formattedDate, readTime, style, theme, oldArticleWarning } = props;
  const color = oldArticleWarning
    ? theme.colors.warning
    : theme.colors.articleTimeStamp;
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        {formattedDate && (
          <Text style={[style, { color: color }]}>
            {oldArticleWarning && (
              <GetIcon
                name={Platform.OS === 'ios' ? 'ios-warning' : 'md-warning'}
                size={getFontSize(SIZES.FONT)}
                color={color}
              />
            )}{' '}
            {formattedDate}
          </Text>
        )}
      </View>
      {readTime && (
        <Text
          style={{
            fontFamily: customFonts.merriweatherSansRegular,
            fontSize: getFontSize(SIZES.FONT),
            marginTop: 4,
            color: color
          }}>
          <GetIcon
            name={Platform.OS === 'ios' ? 'ios-timer' : 'md-time'}
            size={getFontSize(SIZES.FONT)}
            color={style.color}
          />
          {readTime
            ? ' ' + readTime + localStrings('authorByLine.readTime')
            : false}
        </Text>
      )}
    </View>
  );
}

export default withTheme(DateReadTime);
