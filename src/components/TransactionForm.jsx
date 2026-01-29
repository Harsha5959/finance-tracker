import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../redux/transactionSlice";
import { useState } from "react";

export default function TransactionForm() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    mode: "",
    date: "",
    description: "",
    tags: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login to add transactions");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      userId: currentUser.id,
      ...form,
      amount: Number(form.amount),
      tags: form.tags ? form.tags.split(",").map(t => t.trim()) : [],
    };

    dispatch(addTransaction(newTransaction));

    // reset form
    setForm({
      type: "expense",
      amount: "",
      category: "",
      mode: "",
      date: "",
      description: "",
      tags: ""
    });
  };

  return (
    <div style={container}>
      <h3 style={{ marginBottom: "10px" }}>Add Transaction</h3>

      <form onSubmit={handleSubmit} style={formBox}>
        
        {/* Type */}
        <select required value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Amount */}
        <input type="number" placeholder="Amount" required
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        {/* Category Dropdown */}
        <select required value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Category</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

        {/* Payment Mode Dropdown */}
        <select required value={form.mode}
          onChange={(e) => setForm({ ...form, mode: e.target.value })}
        >
          <option value="">Mode</option>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="NetBanking">NetBanking</option>
          <option value="Wallet">Wallet</option>
        </select>

        {/* Date */}
        <input type="date" required
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        {/* Tags */}
        <input type="text" placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />

        {/* Description */}
        <input type="text" placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Submit */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

// Basic Inline CSS
const container = {
  padding: "15px",
  border: "1px solid #ddd",
  background: "white",
  borderRadius: "5px",
  marginBottom: "15px",
};

const formBox = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};
