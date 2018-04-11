import budgetReducer from '../../reducers/budget';
import budgets from '../fixtures/budgets';

test('should set default state', () => {
  const state = budgetReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('should select budget', () => {
  const action = {
    type: 'SELECT_BUDGET',
    budget: budgets[1]
  };
  const state = budgetReducer({}, action);
  expect(state).toEqual({ ...budgets[1] });
});
