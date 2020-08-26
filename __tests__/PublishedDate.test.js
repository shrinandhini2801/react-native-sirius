import PublishedDate from '@atoms/PublishedDate';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const moment = require('moment');
import React from 'react';
import { formatDateForAggregation } from '@utils/formatDate';

configure({ adapter: new Adapter() });

describe('Testing <PublishedDate/>', () => {
  test('should render a PublishedDate with proper dates', () => {
    const wrapper = shallow(
      <PublishedDate
        lastmodifiedepoch={1592867400000}
        publishedepoch={1592867400000}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  describe('Determine when the article was published.', () => {
    test('formatDateforArticle(*) should return when the article was published (1 day ago )', () => {
      expect(formatDateForAggregation(moment().subtract(1, 'day'))).toBe(
        '1 day ago'
      );
    });
  });
  describe('Determine when the article was published.', () => {
    test('formatDateforArticle(*) should return when the article was published (5 days ago)', () => {
      expect(formatDateForAggregation(moment().subtract(5, 'day'))).toBe(
        '5 days ago'
      );
    });
  });
});
