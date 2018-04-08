import moment from 'moment';

export default [{
  id: '1',
  category: 'Food',
  description: 'Gum',
  note: '',
  amount: 195,
  createdAt: 0
}, {
  id: '2',
  category: 'Bill',
  description: 'Rent',
  note: '',
  amount: 1109500,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  category: 'bill',
  description: 'Credit Card',
  note: '',
  amount: 4500,
  createdAt: moment(0).add(4, 'days').valueOf()
}];
