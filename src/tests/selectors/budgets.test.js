import moment from 'moment';
import selectBudgets from '../../selectors/budgets';
import budgets from '../fixtures/budgets';

test('should filter by startDate', () => {
  const filters = {
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
    category: ''
  };
  const result = selectBudgets(budgets, filters);
  expect(result).toEqual([budgets[0]]);
});

test('should filter by endDate', () => {
  const filters = {
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(2, 'days'),
    category: ''
  };
  const result = selectBudgets(budgets, filters);
  expect(result).toEqual([ budgets[1], budgets[2] ]);
});

test('should sort by date', () => {
  const filters = {
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
    category: ''
  };
  const result = selectBudgets(budgets, filters);
  expect(result).toEqual([ budgets[0], budgets[1], budgets[2] ]);
});

test('should sort by amount', () => {
  const filters = {
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
    category: ''
  };
  const result = selectBudgets(budgets, filters);
  expect(result).toEqual([ budgets[0], budgets[1], budgets[2] ]);
});
