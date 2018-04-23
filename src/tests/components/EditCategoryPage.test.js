import React from 'react';
import { shallow } from 'enzyme';
import categories from '../fixtures/categories';
import { EditCategoryPage } from '../../components/EditCategoryPage';

let startEditCategory, startRemoveCategory, history, wrapper;

beforeEach(() => {
  startEditCategory = jest.fn();
  startRemoveCategory = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditCategoryPage
      startEditCategory={startEditCategory}
      startRemoveCategory={startRemoveCategory}
      history={history}
      category={categories[2]}
    />
  );
});

test('should render EditCategoryPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditCategory', () => {
  wrapper.find('CategoriesForm').prop('onSubmit')(categories[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditCategory).toHaveBeenLastCalledWith(categories[2].id, categories[2]);
});

test('should handle startRemoveCategory', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveCategory).toHaveBeenLastCalledWith({
    id: categories[2].id
  });
});
