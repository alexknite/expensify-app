import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.expense ? props.expense.category : '',
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onCategoryChange = (e) => {
    const category = e.target.value;
    this.setState(() => ({ category }));
  };
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = async (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide both description and amount' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        category: this.state.category,
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        {
          this.props.categories.length === 0
          ? <span></span>
          : (
            <select
              className="select"
              value={this.state.category}
              onChange={this.onCategoryChange}
            >
              <option
                disabled
                value
              >
                -- Select a category --
              </option>
            {
              this.props.categories.map(({ id, name }) => {
                return <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              })
            }
            <option value="">None</option>
            </select>
          )
        }
        <input
          className="text-input"
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={(this.onDescriptionChange)}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          className="textarea"
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={(this.onNoteChange)}
        >
        </textarea>
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    );
  };
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps)(ExpenseForm);
