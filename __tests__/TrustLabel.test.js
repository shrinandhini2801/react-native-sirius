import TrustLabel from '@atoms/TrustLabel';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <TrustLabel/>', () => {
  test('TrustLabel should render properly', () => {
    const wrapper = shallow(
      <TrustLabel trustLabel={{ name: 'Test Trust Label' }} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('TrustLabel should NOT return anything if the name is null ', () => {
    const wrapper = shallow(<TrustLabel trustLabel={{ name: null }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
