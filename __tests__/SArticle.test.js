import SArticle from '@atoms/SArticle';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <SArticle/>', () => {
  test('SArticle should render properly with given styles and title', () => {
    const wrapper = shallow(
      <SArticle
        title={'Test Article'}
        size={16}
        paddingBottom={20}
        lineHeight={18}
        color={'white'}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('SArticle should NOT render if the title is null', () => {
    const wrapper = shallow(
      <SArticle
        title={null}
        size={16}
        paddingBottom={20}
        lineHeight={18}
        color={'white'}
      />
    );
    expect(wrapper).toEqual({});
  });
});
