import React from 'react';
import { connect } from 'react-redux';
import BudgetListItem from './BudgetListItem';
import selectBudgets from '../selectors/budgets';

export const BudgetList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Budgets</div>
      <div className="show-for-desktop">Budget</div>
    </div>
    <div className="list-body">
      {
        props.budgets.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No budgets available</span>
          </div>
        ) : (
          props.budgets.map((budget) => {
            return <BudgetListItem key={budget.id} {...budget} />
          })
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    budgets: selectBudgets(state.budgets, state.budgetsFilters)
  };
};

export default connect(mapStateToProps)(BudgetList);
