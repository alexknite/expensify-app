import React from 'react';
import { shallow } from 'enzyme';
import budgets from '../fixtures/budgets';
import { EditBudgetPage } from '../../components/EditBudgetPage';

let startEditBudget, startRemoveBudget, history, wrapper, selectBudget;

beforeEach(() => {
  selectBudget = jest.fn();
  startEditBudget = jest.fn();
  startRemoveBudget = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditBudgetPage
      selectBudget={selectBudget}
      startEditBudget={startEditBudget}
      startRemoveBudget={startRemoveBudget}
      history={history}
      budget={budgets[2]}
    />
  );
});

test('should render EditBudgetPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditBudget', () => {
  wrapper.find('Connect(BudgetForm)').prop('onSubmit')(budgets[2]);
  expect(history.push).toHaveBeenLastCalledWith('/budgets');
  expect(startEditBudget).toHaveBeenLastCalledWith(budgets[2].id, budgets[2]);
});

test('should handle startRemoveBudget', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/budgets');
  expect(startRemoveBudget).toHaveBeenLastCalledWith({
    id: budgets[2].id
  });
});
