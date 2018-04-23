import React from 'react';
import { shallow } from 'enzyme';
import CategoriesSummary from '../../components/CategoriesSummary';

test('should render CategoriesSummary correctly', () => {
  const wrapper = shallow(<CategoriesSummary />);
  expect(wrapper).toMatchSnapshot();
});
