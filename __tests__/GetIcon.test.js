import GetIcon from '@atoms/GetIcon';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
const moment = require('moment');

configure({ adapter: new Adapter() });

describe('Testing <GetIcon/>', () => {
  test('GetIcon should return white Meterial close icon of size 45 ', () => {
    const wrapper = shallow(
      <GetIcon isMaterial name={'close'} size={45} color={'white'} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('GetIcon should return black isFeather arrow down icon of size 20 ', () => {
    const wrapper = shallow(
      <GetIcon isFeather name={'arrow-down-left'} size={20} color={'black'} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
