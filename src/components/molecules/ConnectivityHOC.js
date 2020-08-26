import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import LoadingScreen from '@screens/LoadingScreen';

function ConnectivityHOC(props) {
  const netInfo = useNetInfo();
  return netInfo.isConnected && netInfo.isInternetReachable ? (
    props.children
  ) : netInfo.type !== 'unknown' && !netInfo.isConnected ? (
    <LoadingScreen showNoConnection />
  ) : (
    <LoadingScreen showLoader />
  );
}

export default ConnectivityHOC;
