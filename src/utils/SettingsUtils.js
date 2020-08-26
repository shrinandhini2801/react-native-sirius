import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import { Linking, Platform } from 'react-native';
import { localStrings, getCurrentLocale } from '@utils/i18n';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { ConnectionType } from '@utils/NetConnection';
let connectionInfo = null;
NetInfo.getConnectionInfo().then(con => {
  connectionInfo = con.type;
});
export function sendMail(to, subject) {
  let body = '';
  let bodyNewLine = '<br>';
  if (NetInfo.isConnected) {
    console.log('locales', getCurrentLocale());
    body =
      localStrings('feedback.sysinfo') +
      bodyNewLine +
      localStrings('feedback.device_model') +
      DeviceInfo.getModel() +
      bodyNewLine +
      localStrings('feedback.app_version') +
      DeviceInfo.getVersion() +
      bodyNewLine +
      localStrings('feedback.os') +
      DeviceInfo.getSystemName() +
      ', ' +
      DeviceInfo.getSystemVersion() +
      bodyNewLine +
      localStrings('feedback.language_code') +
      getCurrentLocale() +
      bodyNewLine +
      localStrings('feedback.network') +
      connectionInfo +
      bodyNewLine +
      localStrings('feedback.time') +
      new Date() +
      bodyNewLine;

    Linking.openURL('mailto:' + to + '?subject=' + subject + '&body=' + body);
  } else {
    alert('Connect to Network');
  }
}
