import React from 'react';
import { shallow } from 'enzyme';
import { AddCategoryPage } from '../../components/AddCategoryPage';
import categories from '../fixtures/categories';

let startAddCategory, history, wrapper;

beforeEach(() => {
  startAddCategory = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddCategoryPage startAddCategory={startAddCategory} history={history} />);
});

test('should render AddCategoryPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('CategoriesForm').prop('onSubmit')(categories[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddCategory).toHaveBeenLastCalledWith(categories[1]);
});
