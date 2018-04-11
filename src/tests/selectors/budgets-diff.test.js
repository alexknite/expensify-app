import selectBudgetsTotal from '../../selectors/budgets-diff';
import expenses from '../fixtures/expenses';
import budgets from '../fixtures/budgets';

test('should return 0 if no expenses', () => {
  const res = selectBudgetsTotal([], '');
  expect(res).toBe(0);
});

test('should correctly sum up a single expense', () => {
  const res = selectBudgetsTotal([expenses[0]], 'Food');
  expect(res).toBe(195);
});

test('should correctly sum up multiple expenses', () => {
  const res = selectBudgetsTotal(expenses, 'Food');
  expect(res).toBe(195);
});
