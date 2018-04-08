import React from 'react';
import { shallow } from 'enzyme';
import { AddBudgetPage } from '../../components/AddBudgetPage';
import budgets from '../fixtures/budgets';

let selectBudget, startAddBudget, history, wrapper;

beforeEach(() => {
  selectBudget = jest.fn();
  startAddBudget = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddBudgetPage selectBudget={selectBudget} startAddBudget={startAddBudget} history={history} />);
});

test('should render AddBudgetPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  return console.log(wrapper.find('BudgetForm'));
  wrapper.find('BudgetForm').prop('onSubmit')(budgets[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(selectBudget).toHaveBeenLastCalledWith({});
  expect(startAddBudget).toHaveBeenLastCalledWith(budgets[1]);
});
