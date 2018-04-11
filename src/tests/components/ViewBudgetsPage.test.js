import React from 'react';
import { shallow } from 'enzyme';
import ViewBudgetsPage from '../../components/ViewBudgetsPage';

test('should render ViewBudgetsPage correctly', () => {
  const wrapper = shallow(<ViewBudgetsPage />);
  expect(wrapper).toMatchSnapshot();
});
