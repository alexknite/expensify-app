import selectExpenses from '../../selectors/categories';
import expenses from '../fixtures/expenses';
import categories from '../fixtures/categories';

test('should return 0 if no expenses', () => {
  const res = selectExpenses([], categories[0].name);
  expect(res).toBe(0);
});

test('should correctly sum up a single expense', () => {
  const res = selectExpenses(expenses, categories[0].name);
  expect(res).toBe(1);
});
