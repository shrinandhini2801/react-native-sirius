/**
 * @jest-environment jsdom
 */
import STitle from '@atoms/STitle';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Text } from 'react-native';

describe('Testing <STitle/>', () => {
  test('STitle should render properly with given title', () => {
    const wrapper = shallow(
      <STitle
        title={'Test Title'}
        size={20}
        lineHeight={29}
        style={{
          color: 'black',
          textAlign: 'center'
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('STitle should render half width', () => {
    const wrapper = shallow(
      <STitle
        half
        title={'Test Title'}
        size={20}
        lineHeight={29}
        style={{
          color: 'black',
          textAlign: 'center'
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('STitle should render semi-half width', () => {
    const wrapper = shallow(
      <STitle
        semiHalf
        title={'Test Title'}
        size={20}
        lineHeight={29}
        style={{
          color: 'black',
          textAlign: 'center'
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
