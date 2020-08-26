import Loader from '@atoms/Loader';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <Loader/>', () => {
  test('Loader should return an activity indicator without text', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });
  test('Loader should return an activity indicator with text', () => {
    const wrapper = shallow(<Loader loadingText={'Test loading text'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
