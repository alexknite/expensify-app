import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setBudgetsTextFilter, sortBudgetsByDate, sortBudgetsByAmount, setBudgetsStartDate, setBudgetsEndDate, setBudgetsCategoryFilter } from '../actions/budgetsFilters';

export class BudgetListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setBudgetsStartDate(startDate);
    this.props.setBudgetsEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortBudgetsByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortBudgetsByAmount();
    }
  };
  onCategoryChange = (e) => {
    this.props.setBudgetsCategoryFilter(e.target.value);
  };
  onFocus = (e) => {
    this.props.setBudgetsCategoryFilter('');
  }
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            {
              this.props.categories.length === 0
              ? <span></span>
              : (
                <select
                  className="select"
                  value={this.props.budgetsFilters.category}
                  onChange={this.onCategoryChange}
                  onFocus={this.onFocus}
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
                      value={name}
                    >
                      {name}
                    </option>
                  })
                }
                </select>
              )
            }
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.budgetsFilters.text}
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
              startDate={this.props.budgetsFilters.startDate}
              endDate={this.props.budgetsFilters.endDate}
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
  budgetsFilters: state.budgetsFilters,
  categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
  setBudgetsTextFilter: (text) => dispatch(setBudgetsTextFilter(text)),
  sortBudgetsByDate: () => dispatch(sortBudgetsByDate()),
  sortBudgetsByAmount: () => dispatch(sortBudgetsByAmount()),
  setBudgetsStartDate: (startDate) => dispatch(setBudgetsStartDate(startDate)),
  setBudgetsEndDate: (endDate) => dispatch(setBudgetsEndDate(endDate)),
  setBudgetsCategoryFilter: (category) => dispatch(setBudgetsCategoryFilter(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetListFilters);
