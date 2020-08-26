import AuthorByline from '@atoms/AuthorByline';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <AuthorByline/>', () => {
  test('should render a AuthorByline with author image , credit , read time and dates', () => {
    const wrapper = shallow(
      <AuthorByline
        authors={[
          {
            author: 'testAuthor',
            credit: 'testCredit',
            photo: {
              url:
                'https://images.thestar.com/AnLvdb-sYG6huFX4lHTUE_vIpVg=/100x100/smart/https://www.thestar.com/content/dam/thestar/columnist_logos/Arthur_Bruce_logo2015.JPG'
            }
          }
        ]}
        readTime={'5'}
        publisheddate={'06 22 2020'}
        lastmodifiedepoch={1592916873861}
        publishedepoch={1592867400000}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a AuthorByline without author image', () => {
    const wrapper = shallow(
      <AuthorByline
        authors={[
          {
            author: 'testAuthor',
            credit: 'testCredit',
            photo: null
          }
        ]}
        readTime={'5'}
        publisheddate={'06 22 2020'}
        lastmodifiedepoch={1592916873861}
        publishedepoch={1592867400000}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a AuthorByline without author credit , photo', () => {
    const wrapper = shallow(
      <AuthorByline
        authors={[
          {
            author: 'testAuthor',
            credit: null,
            photo: null
          }
        ]}
        readTime={'5'}
        publisheddate={'06 22 2020'}
        lastmodifiedepoch={1592916873861}
        publishedepoch={1592867400000}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
