import NetInfo from '@react-native-community/netinfo';

export const IsNetConnected = () => {
  return NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};

export const ConnectionType = () => {
  NetInfo.fetch().then(state => {
    return state.type;
  });
};
