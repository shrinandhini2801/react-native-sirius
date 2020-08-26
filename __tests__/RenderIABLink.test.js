import RenderIABLink from '@atoms/RenderIABLink';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <RenderIABLink/>', () => {
  test('RenderIABLink should render properly', () => {
    const wrapper = shallow(
      <RenderIABLink data={{ testKey: 'testVal' }} title={'Test Title'} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
