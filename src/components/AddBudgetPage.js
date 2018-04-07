import React from 'react';
import { connect } from 'react-redux';
import BudgetForm from './BudgetForm';
import { startAddBudget } from '../actions/budgets';
import { selectBudget } from '../actions/budget';

export class AddBudgetPage extends React.Component {
  onSubmit = (budget) => {
    this.props.startAddBudget(budget);
    this.props.selectBudget({});
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Budget</h1>
          </div>
        </div>
        <div className="content-container">
          <BudgetForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddBudget: (budget) => dispatch(startAddBudget(budget)),
  selectBudget: (budget) => dispatch(startAddBudget(budget))
});

export default connect(undefined, mapDispatchToProps)(AddBudgetPage);
