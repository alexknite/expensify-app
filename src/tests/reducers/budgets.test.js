import budgetsReducer from '../../reducers/budgets';
import budgets from '../fixtures/budgets';

test('should set default state', () => {
  const state = budgetsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove budget by id', () => {
  const action = {
    type: 'REMOVE_BUDGET',
    id: budgets[1].id
  };
  const state = budgetsReducer(budgets, action);
  expect(state).toEqual([ budgets[0], budgets[2] ]);
});

test('should not remove budgets if not found', () => {
  const action = {
    type: 'REMOVE_BUDGET',
    id: '-1'
  };
  const state = budgetsReducer(budgets, action);
  expect(state).toEqual(budgets);
});

test('should add a budget', () => {
  const budget = {
    id: '19',
    amount: 87,
    startDate: 0,
    endDate: 1000,
    note: ''
  };
  const action = {
    type: 'ADD_BUDGET',
    budget
  };
  const state = budgetsReducer(budgets, action);
  expect(state).toEqual([ ...budgets, budget ]);
});

test('should edit a budget', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT_BUDGET',
    id: budgets[1].id,
    updates: {
      amount
    }
  };
  const state = budgetsReducer(budgets, action);
  expect(state[1].amount).toBe(amount);
});

test('should not edit a budget if id not found', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT_BUDGET',
    id: -1,
    updates: {
      amount
    }
  };
  const state = budgetsReducer(budgets, action);
  expect(state).toEqual(budgets);
});

test('should set budgets', () => {
  const action = {
    type: 'SET_BUDGETS',
    budgets: [budgets[1]]
  };
  const state = budgetsReducer(budgets, action);
  expect(state).toEqual([budgets[1]]);
});
