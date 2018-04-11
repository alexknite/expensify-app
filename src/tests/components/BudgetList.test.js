import React from 'react';
import { shallow } from 'enzyme';
import { BudgetList } from '../../components/BudgetList';
import budgets from '../fixtures/budgets';

test('should render BudgetList with budgets', () => {
  const wrapper = shallow(<BudgetList budgets={budgets} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render BudgetList with empty message', () => {
  const wrapper = shallow(<BudgetList budgets={[]} />);
  expect(wrapper).toMatchSnapshot();
});
