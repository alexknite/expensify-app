import moment from 'moment';

export default [{
  id: '1',
  category: 'Food',
  amount: 100,
  startDate: 0,
  endDate: moment(0).add(7, 'days').valueOf(),
  note: ''
}, {
  id: '2',
  category: 'food',
  amount: 50,
  startDate: moment(0).subtract(8, 'days').valueOf(),
  endDate: moment(0).subtract(1, 'days').valueOf(),
  note: ''
}, {
  id: '3',
  category: 'Transportation',
  amount: 25,
  startDate: moment(0).subtract(15, 'days').valueOf(),
  endDate: moment(0).subtract(9, 'days').valueOf(),
  note: ''
}];
