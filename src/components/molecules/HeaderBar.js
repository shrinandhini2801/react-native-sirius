import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { withTheme } from 'react-native-paper';
import { withNavigation } from '@react-navigation/compat';
import { SIZES, getFontSize, extraPaddingNeeded } from '@styles/sizes';
import { localStrings } from '@utils/i18n';
import { layout } from '@utils/Layout';
import GetIcon from '@atoms/GetIcon';

function HeaderBar(props) {
  const { theme, showShare } = props;
  const { goBack } = props.navigation;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          marginTop: props.marginTop || 0,
          marginBottom: props.marginBottom || 0
        }
      ]}>
      <TouchableOpacity
        onPress={() => goBack()}
        style={styles.backIconContainer}>
        <GetIcon
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={
            Platform.OS === 'ios'
              ? SIZES.BASE + (layout.isMobile ? 8 : 12)
              : SIZES.BASE + (layout.isMobile ? 8 : 10)
          }
          color={theme.colors.backButton}
        />
        {Platform.OS === 'ios' ? (
          <Text
            style={[
              styles.backtext,
              {
                fontSize: layout.isMobile ? SIZES.BASE : SIZES.BASE + 4,
                color: theme.colors.backButton,
                fontWeight: '500'
              }
            ]}>
            {localStrings('back')}
          </Text>
        ) : (
          false
        )}
      </TouchableOpacity>
      {/* {showShare ? (
        <TouchableOpacity
          onPress={() => console.log('share')}
          style={styles.shareContainer}>
          <GetIcon
            isFeather
            name={'share'}
            size={SIZES.BASE + 2}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      ) : (
          false
        )} */}
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingTop:
      extraPaddingNeeded || (Platform.OS === 'ios' && hasNotch())
        ? SIZES.STATUSBAR_HEIGHT + 20
        : SIZES.BASE + 10,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  backtext: {
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 6
  },
  backIconContainer: {
    flexDirection: 'row',
    marginLeft: SIZES.BASE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30
  },
  shareContainer: { alignItems: 'flex-end', marginRight: SIZES.BASE }
};

export default withNavigation(withTheme(HeaderBar));
