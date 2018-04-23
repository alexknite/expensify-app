import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ categoryName, description, id, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/expense/${id}`}>
    <div>
      <h2 className="list-item__sub-title">{categoryName}</h2>
      <h3 className="list-item__title">{description}</h3>
      <p className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</p>
    </div>
    <h3 className="list-item__data">{numeral(amount / 100).format(',0.00')}</h3>
  </Link>
);

const mapStateToProps = (state, props) => {
  const category = state.categories.find((category) => category.id === props.category);
  const categoryName = category ? category.name : '';
  return {
    categoryName
  };
};

export default connect(mapStateToProps)(ExpenseListItem);
