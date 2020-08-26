import Disclaimer from '@atoms/Disclaimer';
import { displayTrustLabel, TRUST_LABEL_TYPES } from '@utils/displayTrustLabel';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
const moment = require('moment');

configure({ adapter: new Adapter() });

describe('Testing <Disclaimer/>', () => {
  test('Disclaimer should return nothing if the trustlabel is null', () => {
    const wrapper = shallow(<Disclaimer data={{ trustlabel: null }} />);
    expect(wrapper).toEqual({});
  });
  test('should render a Disclaimer with description', () => {
    const wrapper = shallow(
      <Disclaimer
        data={{
          trustlabel: { description: 'testDescription', name: 'testName' }
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  describe('displayTrustLabel(*) function Unit testing', () => {
    test('displayTrustLabel(*) should return false if trust lable is NOT sponsored / supported / advertisement ', () => {
      expect(
        displayTrustLabel('testName', TRUST_LABEL_TYPES.ADVERTISEMENT)
      ).toBe(false);
    });
  });
  describe('displayTrustLabel(*) function Unit testing', () => {
    test('displayTrustLabel(*) should return true if trust lable is sponsored / supported / advertisement ', () => {
      expect(
        displayTrustLabel('advertisement', TRUST_LABEL_TYPES.ADVERTISEMENT)
      ).toBeTruthy();
    });
  });
});
