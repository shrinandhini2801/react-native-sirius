import { Dimensions } from 'react-native';

function useDeviceOrientation() {
  const { height, width } = Dimensions.get('screen');
  if (height >= width) {
    return 'portrait';
  } else {
    return 'landscape';
  }
}

export default useDeviceOrientation;
