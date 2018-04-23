import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { selectBudget } from '../actions/budget';

export const BudgetListItem = ({ id, amount, startDate, endDate, note, selectBudget, categoryId, categoryName }) => {
  const onSelect = () => {
    selectBudget({
      id,
      amount,
      categoryName,
      categoryId
    });
  };
  return (
    <div className="list-item">
      <div>
        <h2 className="list-item__sub-title">{categoryName}</h2>
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

const mapStateToProps = (state, props) => {
  const category = state.categories.find((category) => category.id === props.category);
  const categoryId = category ? category.id : '';
  const categoryName = category ? category.name : '';
  return {
    categoryId,
    categoryName
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectBudget: (budget) => dispatch(selectBudget(budget))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetListItem);
