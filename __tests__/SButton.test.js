import SButton from '@atoms/SButton';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { TouchableOpacity } from 'react-native';

configure({ adapter: new Adapter() });

describe('Testing <SButton/>', () => {
  test('SButton should render properly', () => {
    const wrapper = shallow(
      <SButton
        label={'Test button'}
        labelStyle={{
          color: 'red'
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('SButton onPress functionlaity should work as intended.', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('Button on press invoked');
    const wrapper = shallow(
      <SButton
        onPressAction={onPressEvent}
        label={'Test button'}
        labelStyle={{
          color: 'red'
        }}
      />
    );
    expect(onPressEvent).toHaveBeenCalledTimes(0);
    wrapper
      .find(TouchableOpacity)
      .first()
      .props()
      .onPress();
    expect(onPressEvent).toHaveBeenCalledTimes(1);
  });
});
