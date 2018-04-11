import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectBudget from '../selectors/budgets-diff';

export const BudgetsSummary = ({ moneySpent, moneyAlotted, moneyLeft, category }) => {
  const formattedMoneySpent = numeral(moneySpent / 100).format('$0,0.00');
  const formattedMoneyAlotted = numeral(moneyAlotted / 100).format('$0,0.00');
  const formattedMoneyLeft = numeral(moneyLeft / 100).format('$0,0.00');

  return (
    <div className="page-header">
      <div className="content-container">
        {
          moneyAlotted && category ? (
            <div>
              <h1 className="page-header__title">You have spent <span>{formattedMoneySpent}</span> out of <span>{formattedMoneyAlotted}</span> for <span>{category}</span></h1>
              {
                moneyLeft <= 0 ? (
                  <h1 className="page-header__title">You have spent all your money for <span>{category}</span>!</h1>
                ) : (
                  <h1 className="page-header__title">You may spend <span>{formattedMoneyLeft}</span> more</h1>
                )
              }
            </div>
          ) : (
            <span></span>
          )
        }
        <div className="page-header__actions">
          <Link className="button" to="/create/budget">Add Budget</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ budget, expenses }) => {
  const moneySpent = selectBudget(expenses, budget.category);
  const moneyAlotted = budget.amount;
  const moneyLeft = moneyAlotted - moneySpent;

  return {
    moneySpent,
    moneyAlotted,
    moneyLeft,
    category: budget.category
  };
};

export default connect(mapStateToProps)(BudgetsSummary);
