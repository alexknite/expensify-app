import React from 'react';
import { shallow } from 'enzyme';
import CategoriesPage from '../../components/CategoriesPage';

test('should render CategoriesPage correctly', () => {
  const wrapper = shallow(<CategoriesPage />);
  expect(wrapper).toMatchSnapshot();
});
