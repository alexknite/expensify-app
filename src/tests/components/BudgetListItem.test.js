import React from 'react';
import { shallow } from 'enzyme';
import { BudgetListItem } from '../../components/BudgetListItem';
import budgets from  '../fixtures/budgets';

test('should render BudgetListItem correctly', () => {
  const wrapper = shallow(<BudgetListItem {...budgets[0]} />);
  expect(wrapper).toMatchSnapshot();
});
