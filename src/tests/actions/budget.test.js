import { selectBudget } from '../../actions/budget';
import budgets from '../fixtures/budgets';

test('should generate selectBudget action object', () => {
  const budget = { ...budgets[0] };
  const action = selectBudget(budget);
  expect(action).toEqual({
    type: 'SELECT_BUDGET',
    budget
  });
});
