import PictureCredit from '@atoms/PictureCredit';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <PictureCredit/>', () => {
  test('PictureCredit should render properly with given Credit text', () => {
    const wrapper = shallow(<PictureCredit credit={'Test picture credit'} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('PictureCredit should render nothing if no credit text is passed or is null', () => {
    const wrapper = shallow(<PictureCredit credit={null} />);
    expect(wrapper).toMatchSnapshot();
  });
});
