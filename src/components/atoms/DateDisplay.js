import React from 'react';
import { withTheme, Paragraph } from 'react-native-paper';
import { format } from 'date-fns';
import { customFonts } from '@styles/customFonts';
import { SIZES, getFontSize } from '@styles/sizes';
import { localStrings } from '@utils/i18n';

function DateDisplay(props) {
  const { colors } = props.theme;
  const date = format(new Date(), localStrings('shortDate'));

  return (
    <Paragraph
      style={{
        fontFamily: customFonts.torstarTextRoman,
        fontSize: SIZES.FONT
      }}>
      {date}
    </Paragraph>
  );
}

export default withTheme(DateDisplay);
