import DateReadTime from '@atoms/DateReadTime';
import { formatDateforArticle, isOverOneYearOld } from '@utils/formatDate';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <DateReadTime/>', () => {
  test('should render a DateReadTime with date and readtime ', () => {
    const wrapper = shallow(
      <DateReadTime
        formattedDate={formatDateforArticle(1592867400000)}
        readTime={'5'}
        oldArticleWarning={isOverOneYearOld(1592867400000)}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  describe('Format article date should work fine.', () => {
    test('formatDateforArticle(*) should return formatted date ', () => {
      expect(formatDateforArticle(1592867400000)).toBe('Monday, June 22, 2020');
    });
  });
  describe('Identifying Old article should work fine.', () => {
    test('isOverOneYearOld(*) should return a boolean', () => {
      expect(isOverOneYearOld(1592867400000)).toBe(false);
    });
  });
});
