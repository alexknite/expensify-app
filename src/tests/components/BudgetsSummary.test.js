import React from 'react';
import { shallow } from 'enzyme';
import { BudgetsSummary } from '../../components/BudgetsSummary';

test('should correctly render BudgetsSummary with one budget', () => {
  const wrapper = shallow(
    <BudgetsSummary
      moneySpent={50}
      moneyAlotted={100}
      moneyLeft={50}
      category={'Food'}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
