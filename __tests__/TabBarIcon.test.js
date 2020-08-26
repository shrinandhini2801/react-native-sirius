import TabBarIcon from '@atoms/TabBarIcon';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
const moment = require('moment');

configure({ adapter: new Adapter() });

describe('Testing <TabBarIcon/>', () => {
  test('TabBarIcon should return settings Ionicons ', () => {
    const wrapper = shallow(<TabBarIcon name={'md-settings'} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('TabBarIcon should return home FontAwesome icon ', () => {
    const wrapper = shallow(<TabBarIcon homeIcon={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
