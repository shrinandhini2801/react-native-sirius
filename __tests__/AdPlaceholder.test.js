import AdPlaceHolder from '@atoms/AdPlaceHolder';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <AdPlaceHolder/>', () => {
  test('should render a AdPlaceHolder', () => {
    const wrapper = shallow(<AdPlaceHolder />);
    expect(wrapper).toMatchSnapshot();
  });
});
