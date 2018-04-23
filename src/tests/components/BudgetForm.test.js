import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { BudgetForm } from '../../components/BudgetForm';
import budgets from '../fixtures/budgets';
import categories from '../fixtures/categories';

test('should render BudgetForm correctly', () => {
  const wrapper = shallow(<BudgetForm categories={categories} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render BudgetForm correctly with budget data', () => {
  const wrapper = shallow(<BudgetForm categories={categories} budget={budgets[2]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid for submission', () => {
  const wrapper = shallow(<BudgetForm categories={categories} />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set note on textarea change', () => {
  const value = 'New note';
  const wrapper = shallow(<BudgetForm categories={categories} />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '10.23';
  const wrapper = shallow(<BudgetForm categories={categories} />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '174.222';
  const wrapper = shallow(<BudgetForm categories={categories} />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit for valid form submission', async () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<BudgetForm categories={categories} budget={budgets[0]} onSubmit={onSubmitSpy} />);
  await wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    amount: budgets[0].amount,
    startDate: budgets[0].startDate,
    endDate: budgets[0].endDate,
    note: budgets[0].note,
    category: budgets[0].category
  });
})

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  const wrapper = shallow(<BudgetForm categories={categories} />);
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
