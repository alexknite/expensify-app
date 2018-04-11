export default (expenses, category) => expenses
.filter((expense) => expense.category === category)
.map((expense) => expense.amount)
.reduce((sum, value) => sum + value, 0);
