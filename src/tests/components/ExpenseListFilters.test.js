import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setExpensesTextFilter, sortExpensesByDate, sortExpensesByAmount, setExpensesStartDate, setExpensesEndDate, wrapper;

beforeEach(() => {
  setExpensesTextFilter = jest.fn();
  sortExpensesByDate = jest.fn();
  sortExpensesByAmount = jest.fn();
  setExpensesStartDate = jest.fn();
  setExpensesEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setExpensesTextFilter={setExpensesTextFilter}
      sortExpensesByDate={sortExpensesByDate}
      sortExpensesByAmount={sortExpensesByAmount}
      setExpensesStartDate={setExpensesStartDate}
      setExpensesEndDate={setExpensesEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    expensesFilters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'rent';
  wrapper.find('input').simulate('change', {
    target: { value }
  });
  expect(setExpensesTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortExpensesByAmount).toHaveBeenCalled();
});

test('should sort by date', () => {
  const value = 'date';
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortExpensesByDate).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const startDate = moment(0).add('4', 'years');
  const endDate = moment(0).add('8', 'years');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setExpensesStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setExpensesEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
