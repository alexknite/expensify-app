import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import budgetReducer from '../reducers/budget';
import budgetsReducer from '../reducers/budgets';
import expensesReducer from '../reducers/expenses';
import budgetsFiltersReducer from '../reducers/budgetsFilters';
import expensesFiltersReducer from '../reducers/expensesFilters';
import authReducer from '../reducers/auth';
import categoriesReducer from '../reducers/categories';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      budget: budgetReducer,
      budgets: budgetsReducer,
      categories: categoriesReducer,
      expenses: expensesReducer,
      expensesFilters: expensesFiltersReducer,
      budgetsFilters: budgetsFiltersReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
