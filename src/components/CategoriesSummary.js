import React from 'react';
import { Link } from 'react-router-dom';

export const CategoriesSummary = () => {

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Categories</h1>
        <div className="page-header__actions">
          <Link className="button button--action" to="/create/category">Add Category</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSummary;
