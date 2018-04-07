import moment from 'moment';

export default [{
  id: '1',
  amount: 100,
  startDate: 0,
  endDate: moment(0).add(7, 'days').valueOf(),
  note: ''
}, {
  id: '2',
  amount: 50,
  startDate: moment(0).subtract(8, 'days').valueOf(),
  endDate: moment(0).subtract(1, 'days').valueOf(),
  note: ''
}, {
  id: '3',
  amount: 25,
  startDate: moment(0).subtract(15, 'days').valueOf(),
  endDate: moment(0).subtract(9, 'days').valueOf(),
  note: ''
}];
