export const setBudgetsTextFilter = (text = '') => ({
  type: 'SET_BUDGETS_TEXT_FILTER',
  text
});

export const sortBudgetsByAmount = () => ({
  type: 'SORT_BUDGETS_BY_AMOUNT'
});

export const sortBudgetsByDate = () => ({
  type: 'SORT_BY_DATE'
});

export const setBudgetsCategoryFilter = (category = '') => ({
  type: 'SET_BUDGETS_CATEGORY_FILTER',
  category
});

export const setBudgetsStartDate = (startDate) => ({
  type: 'SET_BUDGETS_START_DATE',
  startDate
});

export const setBudgetsEndDate = (endDate) => ({
  type: 'SET_BUDGETS_END_DATE',
  endDate
});
