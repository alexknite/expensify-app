import categoriesReducer from '../../reducers/categories';
import categories from '../fixtures/categories';

test('should set default state', () => {
  const state = categoriesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove category by id', () => {
  const action = {
    type: 'REMOVE_CATEGORY',
    id: categories[1].id
  };
  const state = categoriesReducer(categories, action);
  expect(state).toEqual([ categories[0], categories[2] ]);
});

test('should not remove categories if not found', () => {
  const action = {
    type: 'REMOVE_CATEGORY',
    id: '-1'
  };
  const state = categoriesReducer(categories, action);
  expect(state).toEqual(categories);
});

test('should add an category', () => {
  const category = {
    id: '19',
    description: 'Laptop',
    note: '',
    createdAt: 20000,
    amount: 29500
  };
  const action = {
    type: 'ADD_CATEGORY',
    category
  };
  const state = categoriesReducer(categories, action);
  expect(state).toEqual([ ...categories, category ]);
});

test('should edit an category', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT_CATEGORY',
    id: categories[1].id,
    updates: {
      amount
    }
  };
  const state = categoriesReducer(categories, action);
  expect(state[1].amount).toBe(amount);
});

test('should not edit an category if id not found', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT_CATEGORY',
    id: -1,
    updates: {
      amount
    }
  };
  const state = categoriesReducer(categories, action);
  expect(state).toEqual(categories);
});

test('should set categories', () => {
  const action = {
    type: 'SET_CATEGORIES',
    categories: [categories[1]]
  };
  const state = categoriesReducer(categories, action);
  expect(state).toEqual([categories[1]]);
});
