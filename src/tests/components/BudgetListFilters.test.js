import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { BudgetListFilters } from '../../components/BudgetListFilters';
import { filters, altFilters } from '../fixtures/budgetsFilters';
import categories from '../fixtures/categories';

let setBudgetsTextFilter, sortBudgetsByDate, sortBudgetsByAmount, setBudgetsStartDate, setBudgetsEndDate, wrapper;

beforeEach(() => {
  setBudgetsTextFilter = jest.fn();
  sortBudgetsByDate = jest.fn();
  sortBudgetsByAmount = jest.fn();
  setBudgetsStartDate = jest.fn();
  setBudgetsEndDate = jest.fn();
  wrapper = shallow(
    <BudgetListFilters
      categories={categories}
      budgetsFilters={filters}
      setBudgetsTextFilter={setBudgetsTextFilter}
      sortBudgetsByDate={sortBudgetsByDate}
      sortBudgetsByAmount={sortBudgetsByAmount}
      setBudgetsStartDate={setBudgetsStartDate}
      setBudgetsEndDate={setBudgetsEndDate}
    />
  );
});

test('should render BudgetListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render BudgetListFilters with alt data correctly', () => {
  wrapper.setProps({
    budgetsFilters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').at(1).simulate('change', {
    target: { value }
  });
  expect(sortBudgetsByAmount).toHaveBeenCalled();
});

test('should sort by date', () => {
  const value = 'date';
  wrapper.find('select').at(1).simulate('change', {
    target: { value }
  });
  expect(sortBudgetsByDate).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const startDate = moment(0).add('4', 'years');
  const endDate = moment(0).add('8', 'years');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setBudgetsStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setBudgetsEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
