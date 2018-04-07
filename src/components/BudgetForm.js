import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { startAddCategory } from '../actions/categories';

export class BudgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.budget ? props.budget.category : '',
      amount: props.budget ? (props.budget.amount / 100).toString() : '',
      startDate: props.budget ? moment(props.budget.startDate) : moment(),
      endDate: props.budget ? moment(props.budget.endDate) : moment().add(7, 'days'),
      note: props.budget ? props.budget.note : '',
      calendarFocused: null
    };
  };
  onCategoryChange = (e) => {
    const category = e.target.value;
    this.setState(() => ({ category }));
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
  onDatesChange = ({ startDate, endDate }) => {
    this.setState(() => ({ startDate, endDate }));
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const cleansedCategories = this.props.categories.map(({ name }) => name
      .replace(/[^A-Z0-9]+/ig, '')
      .toLowerCase());
    const cleansedCategory = this.state.category
      .replace(/[^A-Z0-9]+/ig, '')
      .toLowerCase();
    const categoryIndex = cleansedCategories.indexOf(cleansedCategory);

    if (categoryIndex > -1) {
      await this.setState(() => ({ category: this.props.categories[categoryIndex].name }));
    } else {
      this.props.startAddCategory({ name: this.state.category });
    }

    if (!this.state.amount || (!this.state.startDate && !this.state.endDate) ) {
      this.setState(() => ({ error: 'Please provide the start date, end date and the amount' }))
    } else {
      this.setState(() => ({ error: '' }))
      this.props.onSubmit({
        category: this.state.category,
        amount: parseFloat(this.state.amount, 10) * 100,
        startDate: this.state.startDate.valueOf(),
        endDate: this.state.endDate.valueOf(),
        note: this.state.note
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
          value={this.state.category}
          onChange={(this.onCategoryChange)}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <DateRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={true}
          numberOfMonths={1}
        />
        <textarea
          className="textarea"
          placeholder="Add a note for your budget (optional)"
          value={this.state.note}
          onChange={(this.onNoteChange)}
        >
        </textarea>
        <div>
          <button className="button">Save Budget</button>
        </div>
      </form>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startAddCategory: ({ name }) => dispatch(startAddCategory({ name }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetForm);
