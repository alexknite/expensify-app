import moment from 'moment';
import { setExpensesTextFilter,
  sortExpensesByAmount,
  sortExpensesByDate,
  setExpensesStartDate,
  setExpensesEndDate } from '../../actions/expensesFilters';

test('should generate set start date action object', () => {
  const action = setExpensesStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_EXPENSES_START_DATE',
    startDate: moment(0)
  });
});

test('should generate set end date action object.', () => {
  const action = setExpensesEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_EXPENSES_END_DATE',
    endDate: moment(0)
  });
});

test('should generate set text filter object with text value', () => {
  const text = 'Something in'
  const action = setExpensesTextFilter(text);
  expect(action).toEqual({
    type: 'SET_EXPENSES_TEXT_FILTER',
    text
  });
});

test('should generate set text filter object with default', () => {
  const action = setExpensesTextFilter();
  expect(action).toEqual({
    type: 'SET_EXPENSES_TEXT_FILTER',
    text: ''
  });
});

test('should generate action object for sort by date', () => {
  expect(sortExpensesByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('should generate action object for sort by amount', () => {
  expect(sortExpensesByAmount()).toEqual({ type: 'SORT_EXPENSES_BY_AMOUNT' });
});
