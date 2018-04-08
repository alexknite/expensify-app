export const setExpensesTextFilter = (text = '') => ({
  type: 'SET_EXPENSES_TEXT_FILTER',
  text
});

export const sortExpensesByAmount = () => ({
  type: 'SORT_EXPENSES_BY_AMOUNT'
});

export const sortExpensesByDate = () => ({
  type: 'SORT_BY_DATE'
});

export const setExpensesCategoryFilter = (category = '') => ({
  type: 'SET_CATEGORY_FILTER',
  category
});

export const setExpensesStartDate = (startDate) => ({
  type: 'SET_EXPENSES_START_DATE',
  startDate
});

export const setExpensesEndDate = (endDate) => ({
  type: 'SET_EXPENSES_END_DATE',
  endDate
});
