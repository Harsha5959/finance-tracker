import { useState } from "react";

export default function Filters({ setFilters }) {
  const [filter, setFilter] = useState({
    type: "",
    category: "",
    mode: "",
    month: ""
  });

  const handleChange = (e) => {
    const updated = {
      ...filter,
      [e.target.name]: e.target.value
    };

    setFilter(updated);
    setFilters(updated);
  };

  return (
    <div className="filters">
      <select name="type" value={filter.type} onChange={handleChange}>
        <option value="">Type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        name="category"
        value={filter.category}
        onChange={handleChange}
      >
        <option value="">Category</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Health">Health</option>
        <option value="Salary">Salary</option>
        <option value="Business">Business</option>
        <option value="Freelance">Freelance</option>
        <option value="Investment">Investment</option>
        <option value="Other">Other</option>
      </select>

      <select name="mode" value={filter.mode} onChange={handleChange}>
        <option value="">Payment Mode</option>
        <option value="UPI">UPI</option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="NetBanking">NetBanking</option>
        <option value="Wallet">Wallet</option>
      </select>

      <select name="month" value={filter.month} onChange={handleChange}>
        <option value="">Month</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {new Date(0, i).toLocaleString("default", {
              month: "long"
            })}
          </option>
        ))}
      </select>
    </div>
  );
}
