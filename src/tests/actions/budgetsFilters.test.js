import moment from 'moment';
import { setBudgetsTextFilter,
  sortBudgetsByAmount,
  sortBudgetsByDate,
  setBudgetsStartDate,
  setBudgetsEndDate } from '../../actions/budgetsFilters';

test('should generate set start date action object', () => {
  const action = setBudgetsStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_BUDGETS_START_DATE',
    startDate: moment(0)
  });
});

test('should generate set end date action object.', () => {
  const action = setBudgetsEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_BUDGETS_END_DATE',
    endDate: moment(0)
  });
});

test('should generate set text filter object with text value', () => {
  const text = 'Something in'
  const action = setBudgetsTextFilter(text);
  expect(action).toEqual({
    type: 'SET_BUDGETS_TEXT_FILTER',
    text
  });
});

test('should generate set text filter object with default', () => {
  const action = setBudgetsTextFilter();
  expect(action).toEqual({
    type: 'SET_BUDGETS_TEXT_FILTER',
    text: ''
  });
});

test('should generate action object for sort by date', () => {
  expect(sortBudgetsByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('should generate action object for sort by amount', () => {
  expect(sortBudgetsByAmount()).toEqual({ type: 'SORT_BUDGETS_BY_AMOUNT' });
});
