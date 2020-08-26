import React from 'react';
import { View } from 'react-native';
import { withTheme, Caption, Divider } from 'react-native-paper';
import { SIZES } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';

function PictureCredit(props) {
  const { credit, theme, style } = props;
  return (
    credit && (
      <View style={{ marginVertical: 5, marginBottom: SIZES.PADDING * 2 }}>
        <Caption
          style={[style, { fontFamily: customFonts.merriweatherSansRegular }]}>
          {credit}
        </Caption>
        <Divider style={[styles.divider, { borderColor: theme.colors.line }]} />
      </View>
    )
  );
}

const styles = {
  divider: {
    borderWidth: 0.5
  }
};
export default withTheme(PictureCredit);
