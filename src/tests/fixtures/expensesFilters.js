import moment from 'moment';

const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
  category: ''
};

const altFilters = {
  text: 'bills',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days'),
  category: 'bill'
};

export { filters, altFilters };
