import { Platform } from 'react-native';
import { customFonts } from '@styles/customFonts';

const fontConfig = {
  ios: {
    regular: {
      fontFamily: customFonts.merriweatherSansRegular,
      fontWeight: '400'
    },
    medium: {
      fontFamily: customFonts.merriweatherSansRegular,
      fontWeight: '400'
    },
    light: {
      fontFamily: customFonts.merriweatherSansLight,
      fontWeight: '400'
    },
    thin: {
      fontFamily: customFonts.merriweatherSansLight,
      fontWeight: '200'
    }
  },
  android: {
    regular: {
      fontFamily: customFonts.merriweatherSansRegular,
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: customFonts.merriweatherSansRegular,
      fontWeight: 'normal'
    },
    light: {
      fontFamily: customFonts.merriweatherSansLight,
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: customFonts.merriweatherSansLight,
      fontWeight: 'normal'
    }
  }
};

const configureFonts =
  Platform.OS === 'ios' ? fontConfig.ios : fontConfig.android;

export default configureFonts;
