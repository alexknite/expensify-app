import React from 'react';

export class CategoriesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.category ? props.category.name : ''
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };
  onTextChange(e) {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };
  onSubmit(e) {
    e.preventDefault();

    if (this.state.name === '') {
      this.setState(() => ({ error: 'Category names cannot be blank' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        name: this.state.name
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          className="text-input"
          type="text"
          placeholder="Category"
          autoFocus
          value={this.state.name}
          onChange={(this.onTextChange)}
        />
        <div>
          <button className="button">Save Category</button>
        </div>
      </form>
    );
  };
};

export default CategoriesForm;
