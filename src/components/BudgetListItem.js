import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { selectBudget } from '../actions/budget';

export const BudgetListItem = ({ id, amount, startDate, endDate, note, selectBudget, category }) => {
  const onSelect = () => {
    selectBudget({
      id,
      amount,
      startDate,
      endDate,
      note,
      category
    });
  };
  return (
    <div className="list-item">
      <div>
        <h2 className="list-item__sub-title">{category}</h2>
        <h3 className="list-item__title">{numeral(amount / 100).format(',0.00')}</h3>
        <p className="list-item__sub-title">{moment(startDate).format('MMMM Do, YYYY')} - {moment(endDate).format('MMMM Do, YYYY')}</p>
        <h3 className="list-item__sub-title">{note}</h3>
      </div>
      <div className="list-item__actions">
        <button className="button button--link" onClick={onSelect}>
          <img src="/images/eye.svg" alt="Select"/>
        </button>
        <Link to={`edit/budget/${id}`}>
          <button className="button button--link">
            <img src="/images/edit.svg" alt="Edit"/>
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectBudget: (budget) => dispatch(selectBudget(budget))
  };
};

export default connect(undefined, mapDispatchToProps)(BudgetListItem);
