import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setExpensesTextFilter, sortExpensesByDate, sortExpensesByAmount, setExpensesStartDate, setExpensesEndDate, setExpensesCategoryFilter } from '../actions/expensesFilters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setExpensesStartDate(startDate);
    this.props.setExpensesEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  onTextChange = (e) => {
    this.props.setExpensesTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortExpensesByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortExpensesByAmount();
    }
  };
  onCategoryChange = (e) => {
    this.props.setExpensesCategoryFilter(e.target.value);
  };
  render() {
    return (
      <div className="content-container content-container__filters">
        <div className="input-group">
          <div className="input-group__item">
            {
              this.props.categories.length === 0
              ? <span></span>
              : (
                <select
                  className="select"
                  value={this.props.expensesFilters.category}
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
          </div>
          <div className="input-group__item">
            <input
              className="text-input"
              placeholder="Search expenses"
              type="text"
              value={this.props.expensesFilters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.expensesFilters.sortBy}
              onChange={this.onSortChange}
            >
              <option
                value="date"
              >
                Date
              </option>
              <option
                value="amount"
              >
                Amount
              </option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.expensesFilters.startDate}
              endDate={this.props.expensesFilters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  expensesFilters: state.expensesFilters,
  categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
  setExpensesTextFilter: (text) => dispatch(setExpensesTextFilter(text)),
  sortExpensesByDate: () => dispatch(sortExpensesByDate()),
  sortExpensesByAmount: () => dispatch(sortExpensesByAmount()),
  setExpensesStartDate: (startDate) => dispatch(setExpensesStartDate(startDate)),
  setExpensesEndDate: (endDate) => dispatch(setExpensesEndDate(endDate)),
  setExpensesCategoryFilter: (category) => dispatch(setExpensesCategoryFilter(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
