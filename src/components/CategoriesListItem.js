import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/categories';

export const CategoriesListItem = ({ id, name, amount }) => (
  <Link className="list-item" to={`/edit/category/${id}`}>
    <div>
      <h3 className="list-item__title">{name}</h3>
    </div>
    <h2 className="list-item__data">{amount}</h2>
  </Link>
);

const mapStateToProps = ({ expenses }, { id }) => {
  const amount = selectExpenses(expenses, id);
  return {
    amount
  };
};

export default connect(mapStateToProps)(CategoriesListItem);
