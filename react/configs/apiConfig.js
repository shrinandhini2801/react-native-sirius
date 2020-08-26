import DeviceInfo from 'react-native-device-info';
import { layout } from '@utils/Layout';

export const ENVIRONMENT = 'dev';
export const APP_NAME = 'Sirius';
export const AEM_ENDPOINT = 'http://stage.smgdigitaldev.com';
export const TENANT_ENDPOINT = '/content/TheStarMobileApp';
export const NAV_ENDPOINT = '/navigation_v2';
export const ADOBE_LAUNCH_ENDPOINT =
  'launch-ENcc698ba64d2d40b6843c7dcd43dbf0e3-development';
export const APP_INFO = {
  version: DeviceInfo.getVersion(),
  buildNumber: DeviceInfo.getBuildNumber(),
  topLevelDomain: '.com',
  breakpoint: layout.isMobile ? 'app|mobile' : 'app|tablet',
  trackState: {},
  trackAction: {}
};
// export const AEM_ENDPOINT = 'http://stage.smgdigitaldev.com';
// export const TENANT_ENDPOINT = '/content/TheStarMobileApp';
