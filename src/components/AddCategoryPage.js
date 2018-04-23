import React from 'react';
import { connect } from 'react-redux';
import CategoriesForm from './CategoriesForm';
import { startAddCategory } from '../actions/categories';

export class AddCategoryPage extends React.Component {
  onSubmit = (category) => {
    this.props.startAddCategory(category);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Category</h1>
          </div>
        </div>
        <div className="content-container">
          <CategoriesForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddCategory: (category) => dispatch(startAddCategory(category)),
});

export default connect(undefined, mapDispatchToProps)(AddCategoryPage);
