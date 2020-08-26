import TextHeader from '@atoms/TextHeader';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <TextHeader/>', () => {
  test('should render a TextHeader', () => {
    const wrapper = shallow(<TextHeader headerTitle={'Sample Header title'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
