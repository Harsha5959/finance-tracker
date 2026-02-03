import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction, updateTransaction } from "../redux/transactionSlice";
import { sortByField } from "../redux/filterSlice";
import { useState } from "react";

export default function TransactionTable({ filters }) {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);
  const allTransactions = useSelector(state => state.transaction.transactions);

  const sortField = useSelector(state => state.filter.sortField);
  const sortOrder = useSelector(state => state.filter.sortOrder);

  // Edit state
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // 1️⃣ Filter by logged-in user
  let filtered = allTransactions.filter(
    t => t.userId === currentUser.id
  );

  // 2️⃣ Apply filters (from Dashboard)
  if (filters.type) {
    filtered = filtered.filter(t => t.type === filters.type);
  }

  if (filters.category) {
    filtered = filtered.filter(t => t.category === filters.category);
  }

  if (filters.mode) {
    filtered = filtered.filter(t => t.mode === filters.mode);
  }

  if (filters.month) {
    filtered = filtered.filter(
      t => new Date(t.date).getMonth() + 1 == filters.month
    );
  }

  // 3️⃣ Apply sorting
  if (sortField) {
    filtered.sort((a, b) => {
      if (sortField === "amount") {
        return sortOrder === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }

      if (sortField === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }

      if (sortField === "category") {
        return sortOrder === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }

      return 0;
    });
  }

  return (
    <div style={box}>
      <h3>Transactions</h3>

      {filtered.length === 0 ? (
        <p>No transactions found...</p>
      ) : (
        <>
          {/* SORT BUTTONS */}
          <div style={sortBox}>
            <button onClick={() => dispatch(sortByField("amount"))}>
              Sort Amount
            </button>
            <button onClick={() => dispatch(sortByField("date"))}>
              Sort Date
            </button>
            <button onClick={() => dispatch(sortByField("category"))}>
              Sort Category
            </button>
          </div>

          {/* TABLE */}
          <table style={table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  {editId === t.id ? (
                    <>
                      {/* DATE */}
                      <td>
                        <input
                          type="date"
                          value={editForm.date}
                          onChange={e =>
                            setEditForm({ ...editForm, date: e.target.value })
                          }
                        />
                      </td>

                      {/* TYPE */}
                      <td>
                        <select
                          value={editForm.type}
                          onChange={e =>
                            setEditForm({ ...editForm, type: e.target.value })
                          }
                        >
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
                        </select>
                      </td>

                      {/* CATEGORY (TEXT INPUT – supports custom) */}
                      <td>
                        <input
                          type="text"
                          value={editForm.category}
                          onChange={e =>
                            setEditForm({ ...editForm, category: e.target.value })
                          }
                          required
                        />
                      </td>

                      {/* AMOUNT */}
                      <td>
                        <input
                          type="number"
                          value={editForm.amount}
                          onChange={e =>
                            setEditForm({ ...editForm, amount: e.target.value })
                          }
                        />
                      </td>

                      {/* MODE */}
                      <td>
                        <select
                          value={editForm.mode}
                          onChange={e =>
                            setEditForm({ ...editForm, mode: e.target.value })
                          }
                        >
                          <option>UPI</option>
                          <option>Cash</option>
                          <option>Card</option>
                          <option>NetBanking</option>
                          <option>Wallet</option>
                        </select>
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <button
                          onClick={() => {
                            dispatch(updateTransaction({
                              ...editForm,
                              id: editId,
                              userId: currentUser.id,
                              amount: Number(editForm.amount),
                              tags: editForm.tags
                                ? editForm.tags
                                    .split(",")
                                    .map(t => t.trim())
                                : []
                            }));
                            setEditId(null);
                          }}
                        >
                          Save
                        </button>

                        <button onClick={() => setEditId(null)}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{t.date}</td>
                      <td>{t.type}</td>
                      <td>{t.category}</td>
                      <td>₹{t.amount}</td>
                      <td>{t.mode}</td>
                      <td>
                        <button
                          onClick={() => {
                            setEditId(t.id);
                            setEditForm({
                              ...t,
                              tags: t.tags?.join(",") || ""
                            });
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => dispatch(deleteTransaction(t.id))}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

/* BASIC STYLES */
const box = {
  padding: "15px",
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "6px",
  marginTop: "10px"
};

const sortBox = {
  marginBottom: "10px",
  display: "flex",
  gap: "10px"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};
