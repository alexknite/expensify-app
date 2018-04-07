import React from 'react';
import BudgetsSummary from './BudgetsSummary';
import BudgetList from './BudgetList';
import BudgetListFilters from './BudgetListFilters';

const ViewBudgetsPage = () => (
  <div>
    <BudgetsSummary />
    <BudgetListFilters />
    <BudgetList />
  </div>
);

export default ViewBudgetsPage;
