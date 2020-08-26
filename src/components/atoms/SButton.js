import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

function SButton(props) {
  const { label, onPressAction, buttonContentStyle, labelStyle } = props;
  const handleOnPress = () => {
    if (onPressAction) {
      onPressAction();
    } else {
      return null;
    }
  };
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }
      ]}>
      <TouchableOpacity
        style={[
          buttonContentStyle,
          {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
        onPress={() => handleOnPress()}>
        <Text style={labelStyle}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SButton;
