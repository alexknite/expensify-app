export default (expenses, id) => expenses.filter((expense) => expense.category === id).length;
