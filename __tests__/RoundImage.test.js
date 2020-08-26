import RoundImage from '@atoms/RoundImage';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <RoundImage/>', () => {
  test('RoundImage should render properly ', () => {
    const wrapper = shallow(
      <RoundImage url={'https://picsum.photos/200/300'} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('RoundImage should render default image if the iamge url is null or empty ', () => {
    const wrapper = shallow(<RoundImage url={null} />);
    expect(wrapper).toMatchSnapshot();
  });
});
