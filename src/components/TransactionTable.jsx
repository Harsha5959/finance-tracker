import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../redux/transactionSlice";
import { sortByField } from "../redux/filterSlice";
import { updateTransaction } from "../redux/transactionSlice";
import { useState } from "react";


export default function TransactionTable({ filters }) {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});


  const currentUser = useSelector(state => state.user.currentUser);
  const allTransactions = useSelector(state => state.transaction.transactions);

  // === Filter only current user's data ===
  let filtered = allTransactions.filter(t => t.userId === currentUser.id);

  // === FILTERS (from DashboardPage) ===
  if (filters.type) filtered = filtered.filter(t => t.type === filters.type);
  if (filters.category) filtered = filtered.filter(t => t.category === filters.category);
  if (filters.mode) filtered = filtered.filter(t => t.mode === filters.mode);
  if (filters.month) {
    filtered = filtered.filter(t => {
      const month = new Date(t.date).getMonth() + 1;
      return month == filters.month;
    });
  }

  // === SORTING ===
  const sortField = useSelector(state => state.filter.sortField);
  const sortOrder = useSelector(state => state.filter.sortOrder);

  if (sortField) {
    filtered.sort((a, b) => {
      if (sortField === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
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

      {/* If no results */}
      {filtered.length === 0 ? (
        <p>No transactions found...</p>
      ) : (
        <>

          {/* Sorting Buttons */}
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

          {/* Table */}
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
                  <td>{t.date}</td>
                  <td>{t.type}</td>
                  <td>{t.category}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.mode}</td>
                  <td>
                    <button onClick={() => {
                        setEditId(t.id);
                        setEditForm({ ...t, tags: t.tags?.join(",") });
                        }}>
                        Edit
                    gv</button>

                    <button onClick={() => dispatch(deleteTransaction(t.id))}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

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
