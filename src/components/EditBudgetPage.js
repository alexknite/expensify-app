import React from 'react';
import { connect } from 'react-redux';
import BudgetForm from './BudgetForm';
import { startEditBudget, startRemoveBudget } from '../actions/budgets';
import { selectBudget} from '../actions/budget';

export class EditBudgetPage extends React.Component {
  onSubmit = (budget) => {
    this.props.startEditBudget(this.props.budget.id, budget);
    this.props.selectBudget({});
    this.props.history.push('/budgets');
  };
  onRemove = () => {
    this.props.startRemoveBudget({ id: this.props.budget.id });
    this.props.history.push('/budgets');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header-title">Edit Budget</h1>
          </div>
        </div>
        <div className="content-container">
          <BudgetForm
            budget={this.props.budget}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Remove Budget</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  budget: state.budgets.find((budget) => budget.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditBudget: (id, budget) => dispatch(startEditBudget(id, budget)),
  startRemoveBudget: (data) => dispatch(startRemoveBudget(data)),
  selectBudget: (budget) => dispatch(selectBudget(budget))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBudgetPage);
