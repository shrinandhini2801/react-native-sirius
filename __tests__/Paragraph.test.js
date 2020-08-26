import Paragraph from '@atoms/Paragraph';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Testing <Paragraph/>', () => {
  test('Paragraph should render properly with the given html paragraph', () => {
    const wrapper = shallow(
      <Paragraph
        data={{
          text:
            '<p>Scotlynn Growers, a massive Norfolk County farming operation about two hours southwest of Toronto that describes itself as &#8220;North America&#8217;s Farm Stand,&#8221; is the site of one of Ontario&#8217;s largest recorded COVID-19 outbreaks. Some 199 workers there have tested positive for the virus.</p>'
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('Paragraph should render properly when Hyperlink is available in the paragraph ', () => {
    const wrapper = shallow(
      <Paragraph
        data={{
          text:
            '<p>In 1988, <a href="https://www.thestar.com/news/gta/2016/04/18/sius-creation-came-amidst-racially-charged-atmosphere.html">Lester Donaldson</a> was shot dead by a police officer in the Toronto rooming house where he lived. Donaldson, a 44-year-old Black man, was holding a small paring knife and had been diagnosed with schizophrenia.</p>'
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('Paragraph should render nothing if paragraph is empty ', () => {
    const wrapper = shallow(
      <Paragraph
        data={{
          text: ''
        }}
      />
    );
    expect(wrapper).toEqual({});
  });
});
