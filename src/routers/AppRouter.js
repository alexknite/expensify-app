import React from 'react';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import SettingsPage from '../components/SettingsPage';
import ViewBudgetsPage from '../components/ViewBudgetsPage';
import AddExpensePage from '../components/AddExpensePage';
import AddBudgetPage from '../components/AddBudgetPage';
import EditExpensePage from '../components/EditExpensePage';
import EditBudgetPage from '../components/EditBudgetPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/settings" component={SettingsPage} />
        <PrivateRoute path="/budgets" component={ViewBudgetsPage} />
        <PrivateRoute path="/create/expense" component={AddExpensePage} />
        <PrivateRoute path="/create/budget" component={AddBudgetPage} />
        <PrivateRoute path="/edit/expense/:id" component={EditExpensePage} />
        <PrivateRoute path="/edit/budget/:id" component={EditBudgetPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
