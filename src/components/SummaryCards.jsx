export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = income - expense;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <h4>Income</h4>
        <p>₹{income}</p>
      </div>

      <div className="summary-card">
        <h4>Expense</h4>
        <p>₹{expense}</p>
      </div>

      <div className="summary-card">
        <h4>Savings</h4>
        <p>₹{savings}</p>
      </div>
    </div>
  );
}
