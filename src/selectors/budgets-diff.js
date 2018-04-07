export default (expenses, category, amount) => expenses
.filter((expense) => expense.category === category)
.map((expense) => expense.amount)
.reduce((sum, value) => sum + value, 0);
