import React from 'react';
import { connect } from 'react-redux';
import CategoriesListItem from './CategoriesListItem';

export const CategoriesList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Budget</div>
      <div className="show-for-desktop">Categories</div>
    </div>
    <div className="list-body">
      {
        props.categories.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No categories available</span>
          </div>
        ) : (
          props.categories.map((category) => {
            return <CategoriesListItem key={category.id} {...category} />
          })
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(CategoriesList);
