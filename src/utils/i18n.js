import I18n from 'i18n-js';
import { getLocales } from 'react-native-localize';

import en from './locales/en.json';

const locales = getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  en
};

export function getCurrentLocale() {
  return I18n.locale;
}

export function localStrings(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
