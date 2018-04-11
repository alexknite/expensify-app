import moment from 'moment';

const filters = {
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
  category: ''
};

const altFilters = {
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days'),
  category: 'bill'
};

export { filters, altFilters };
