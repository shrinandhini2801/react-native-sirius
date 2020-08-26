import SectionLabel from '@atoms/SectionLabel';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Text } from 'react-native';

configure({ adapter: new Adapter() });

describe('Testing <SectionLabel/>', () => {
  test('SectionLabel should render properly with given title', () => {
    const wrapper = shallow(<SectionLabel label={'Test Label'} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('SectionLabel should NOT render if the label is null', () => {
    const wrapper = shallow(<SectionLabel label={null} />);
    expect(wrapper).toEqual({});
  });
});
