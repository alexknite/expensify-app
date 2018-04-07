const budgetsReducerDefState = [];

export default (state = budgetsReducerDefState, action) => {
  switch (action.type) {
    case 'ADD_BUDGET':
      return [
        ...state,
        action.budget
      ];
    case 'REMOVE_BUDGET':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_BUDGET':
      return state.map((budget) => {
        if (budget.id === action.id) {
          return {
            ...budget,
            ...action.updates
          };
        } else {
          return budget;
        }
      });
    case 'SET_BUDGETS':
      return action.budgets;
    default:
      return state;
  }
};
