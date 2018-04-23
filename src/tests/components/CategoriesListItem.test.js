import React from 'react';
import { shallow } from 'enzyme';
import { CategoriesListItem } from '../../components/CategoriesListItem';
import categories from  '../fixtures/categories';

test('should render CategoriesListItem correctly', () => {
  const wrapper = shallow(<CategoriesListItem {...categories[0]} />);
  expect(wrapper).toMatchSnapshot();
});
