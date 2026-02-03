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
    customCategory: "",
    mode: "",
    date: "",
    description: "",
    tags: ""
  });

  // Category lists
  const incomeCategories = [
    "Salary",
    "Business",
    "Freelance",
    "Investment",
    "Interest",
    "Other"
  ];

  const expenseCategories = [
    "Food",
    "Rent",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Other"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login to add transactions");
      return;
    }

    const finalCategory =
      form.category === "Other"
        ? form.customCategory.trim()
        : form.category;

    if (!finalCategory) {
      alert("Please enter category");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      userId: currentUser.id,
      type: form.type,
      amount: Number(form.amount),
      category: finalCategory,
      mode: form.mode,
      date: form.date,
      description: form.description,
      tags: form.tags
        ? form.tags.split(",").map(t => t.trim())
        : []
    };

    dispatch(addTransaction(newTransaction));

    // Reset form
    setForm({
      type: "expense",
      amount: "",
      category: "",
      customCategory: "",
      mode: "",
      date: "",
      description: "",
      tags: ""
    });
  };

  return (
    <div className="transaction-form">
      <h3>Add Transaction</h3>

      <form onSubmit={handleSubmit}>
        {/* TYPE */}
        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
              category: "",
              customCategory: ""
            })
          }
          required
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          required
        />

        {/* CATEGORY */}
        <select
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
              customCategory: ""
            })
          }
          required
        >
          <option value="">Category</option>
          {(form.type === "income"
            ? incomeCategories
            : expenseCategories
          ).map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* CUSTOM CATEGORY */}
        {form.category === "Other" && (
          <input
            type="text"
            placeholder="Enter custom category"
            value={form.customCategory}
            onChange={(e) =>
              setForm({ ...form, customCategory: e.target.value })
            }
            required
          />
        )}

        {/* PAYMENT MODE */}
        <select
          value={form.mode}
          onChange={(e) =>
            setForm({ ...form, mode: e.target.value })
          }
          required
        >
          <option value="">Payment Mode</option>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="NetBanking">NetBanking</option>
          <option value="Wallet">Wallet</option>
        </select>

        {/* DATE */}
        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          required
        />

        {/* TAGS */}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) =>
            setForm({ ...form, tags: e.target.value })
          }
        />

        {/* DESCRIPTION */}
        <input
          type="text"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}
