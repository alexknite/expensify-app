import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ category, description, id, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/expense/${id}`}>
    <div>
      <h2 className="list-item__sub-title">{category}</h2>
      <h3 className="list-item__title">{description}</h3>
      <p className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</p>
    </div>
    <h3 className="list-item__data">{numeral(amount / 100).format(',0.00')}</h3>
  </Link>
);

export default ExpenseListItem;
