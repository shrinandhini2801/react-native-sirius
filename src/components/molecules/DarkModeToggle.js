import React, { useState, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { localStrings } from '@utils/i18n';
import { SIZES, getFontSize } from '@styles/sizes';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { mapDispatchActions } from '@utils/redux';
import { toggleDarkMode } from '../../redux/session/actions';
import { layout } from '@utils/Layout';

const mappedState = state => ({
  selectedTheme: state.sessionReducer.selectedTheme
});

const DarkModeToggle = props => {
  const tablet = !layout.isMobile;
  const dispatch = useDispatch();
  const actions = mapDispatchActions({ toggleDarkMode }, dispatch);
  const { selectedTheme } = useMappedState(mappedState);
  const updateDarkMode = () => {
    if (selectedTheme === 'dark') {
      actions.toggleDarkMode('light');
    } else {
      actions.toggleDarkMode('dark');
    }
  };
  const switchThumbColor =
    selectedTheme === 'light'
      ? props.theme.colors.whiteText
      : props.theme.colors.primary;
  return (
    <List.Item
      style={{
        backgroundColor: props.theme.colors.surface,
        marginLeft: tablet ? 16 : 0
      }}
      titleStyle={{ fontSize: getFontSize(SIZES.BASE) }}
      title={
        Platform.OS === 'ios'
          ? localStrings('settings.dark_mode')
          : localStrings('settings.dark_theme')
      }
      right={props => (
        <Switch
          style={{ marginRight: tablet ? 18 : 0 }}
          thumbColor={switchThumbColor}
          color="rgba(120,120,128,0.32)"
          value={selectedTheme === 'dark'}
          onValueChange={() => updateDarkMode()}
        />
      )}
    />
  );
};

export default DarkModeToggle;
