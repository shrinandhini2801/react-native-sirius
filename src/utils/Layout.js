import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const layout = {
  height: height,
  width: width,
  isMobile: width < 481
};
