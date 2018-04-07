const categoriesReducerDefState = [];

export default (state = categoriesReducerDefState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        action.category
      ];
    case 'REMOVE_CATEGORY':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_CATEGORY':
      return state.map((category) => {
        if (category.id === action.id) {
          return {
            ...category,
            ...action.updates
          };
        } else {
          return category;
        }
      });
    case 'SET_CATEGORIES':
      return action.categories;
    default:
      return state;
  }
};
