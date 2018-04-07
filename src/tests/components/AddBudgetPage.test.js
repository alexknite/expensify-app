import React from 'react';
import { shallow } from 'enzyme';
import { AddBudgetPage } from '../../components/AddBudgetPage';
import budgets from '../fixtures/budgets';

let startAddBudget, history, wrapper;

beforeEach(() => {
  startAddBudget = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddBudgetPage startAddBudget={startAddBudget} history={history} />);
});

test('should render AddBudgetPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('BudgetForm').prop('onSubmit')(budgets[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddBudget).toHaveBeenLastCalledWith(budgets[1]);
});
