import moment from 'moment';

const filtersReducerDefState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
  category: ''
};

export default (state = filtersReducerDefState, action) => {
  switch (action.type) {
    case 'SET_BUDGETS_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BUDGETS_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BUDGETS_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_BUDGETS_CATEGORY_FILTER':
      return {
        ...state,
        category: action.category
      }
    case 'SET_BUDGETS_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_BUDGETS_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
