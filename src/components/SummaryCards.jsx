export default function SummaryCards({ transactions }) {
  
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = income - expense;

  return (
    <div style={wrap}>
      <div style={card}>Income: ₹{income}</div>
      <div style={card}>Expense: ₹{expense}</div>
      <div style={card}>Savings: ₹{savings}</div>
    </div>
  );
}

const wrap = {
  display: "flex",
  gap: "15px",
  marginBottom: "15px"
};

const card = {
  padding: "10px 15px",
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontWeight: 600,
  minWidth: "120px",
  textAlign: "center"
};
