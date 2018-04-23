import React from 'react';
import { shallow } from 'enzyme';
import { CategoriesList } from '../../components/CategoriesList';
import categories from '../fixtures/categories';

test('should render CategoriesList with categories', () => {
  const wrapper = shallow(<CategoriesList categories={categories} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render CategoriesList with empty message', () => {
  const wrapper = shallow(<CategoriesList categories={[]} />);
  expect(wrapper).toMatchSnapshot();
});
