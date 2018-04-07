import moment from 'moment';

export default (budgets, { text, sortBy, startDate, endDate, category }) => {
  return budgets.filter((budget) => {
    const startDateMoment = moment(budget.startDate);
    const endDateMoment = moment(budget.endDate);
    const startDateMatch = startDate ? startDate.isSameOrBefore(startDateMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(endDateMoment, 'day') : true;
    const categoryMatch = budget.category.toLowerCase().includes(category.toLowerCase());

    return startDateMatch && endDateMatch && categoryMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};
