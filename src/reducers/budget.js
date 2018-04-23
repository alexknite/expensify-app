const budgetReducerDefState = {};

export default (state = budgetReducerDefState, action) => {
  switch (action.type) {
    case 'SELECT_BUDGET':
      return action.id;
    default:
      return state;
  };
};
