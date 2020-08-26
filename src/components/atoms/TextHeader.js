import React from 'react';
import { View } from 'react-native';
import { customFonts } from '@styles/customFonts';
import { withTheme, Divider } from 'react-native-paper';
import { SIZES } from '@styles/sizes';
import STitle from '@atoms/STitle';
import { layout } from '@utils/Layout';

function TextHeader(props) {
  const { headerTitle, theme } = props;
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <STitle
        avoidTextScaling
        fontFamily={customFonts.torstarDecSemiBold}
        title={headerTitle}
        size={SIZES.BASE * 2}
        opacity={theme.dark ? 1 : 0.78}
        style={styles.title}
      />
      <Divider style={[styles.divider, { borderColor: theme.colors.line }]} />
    </View>
  );
}

export default withTheme(TextHeader);

const styles = {
  title: {
    paddingHorizontal: SIZES.PADDING + 4,
    letterSpacing: 0.4,
    paddingTop: layout.isMobile ? 20 : SIZES.BASE * 3,
    paddingBottom: 5
  },
  divider: {
    borderWidth: 0.5,
    marginHorizontal: SIZES.BASE
  }
};
