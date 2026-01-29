import { useState } from "react";

export default function Filters({ setFilters }) {
  const [filter, setFilter] = useState({
    type: "",
    category: "",
    mode: "",
    month: ""
  });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setFilters({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div style={box}>
      <h4>Filters</h4>

      <select name="type" onChange={handleChange}>
        <option value="">Type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select name="category" onChange={handleChange}>
        <option value="">Category</option>
        <option>Food</option>
        <option>Rent</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Entertainment</option>
        <option>Health</option>
        <option>Other</option>
      </select>

      <select name="mode" onChange={handleChange}>
        <option value="">Mode</option>
        <option>UPI</option>
        <option>Cash</option>
        <option>Card</option>
        <option>NetBanking</option>
        <option>Wallet</option>
      </select>

      <select name="month" onChange={handleChange}>
        <option value="">Month</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i+1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
    </div>
  );
}

const box = {
  padding: "10px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  background: "white"
};
