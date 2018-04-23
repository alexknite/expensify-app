import React from 'react';
import { connect } from 'react-redux';
import CategoriesForm from './CategoriesForm';
import { startEditCategory, startRemoveCategory } from '../actions/categories';

export class EditCategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  onSubmit(category) {
    this.props.startEditCategory(this.props.category.id, category);
    this.props.history.push('/');
  };
  onRemove() {
    this.props.startRemoveCategory({ id: this.props.category.id });
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header-title">Category Settings</h1>
          </div>
        </div>
        <div className="content-container">
          <CategoriesForm
            category={this.props.category}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Remove Category</button>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({
  category: state.categories.find((category) => category.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startEditCategory: (id, category) => dispatch(startEditCategory(id, category)),
  startRemoveCategory: ({ id }) => dispatch(startRemoveCategory({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryPage);
