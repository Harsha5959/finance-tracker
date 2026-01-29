import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import Filters from "../components/Filters";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import SummaryCards from "../components/SummaryCards";  // added for summary

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.currentUser);

  // auth guard
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // filters state
  const [filters, setFilters] = useState({});

  // fetch transactions for summary
  const allTransactions = useSelector(state => state.transaction.transactions);

  // filter only current user's transactions
  let userTransactions = allTransactions.filter(t => t.userId === currentUser.id);

  // apply filters for summary card totals
  if (filters.type) userTransactions = userTransactions.filter(t => t.type === filters.type);
  if (filters.category) userTransactions = userTransactions.filter(t => t.category === filters.category);
  if (filters.mode) userTransactions = userTransactions.filter(t => t.mode === filters.mode);
  if (filters.month) userTransactions = userTransactions.filter(t =>
    new Date(t.date).getMonth() + 1 == filters.month
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div style={container}>

      {/* HEADER */}
      <div style={header}>
        <h2 style={title}>Finance Dashboard</h2>

        <div style={userBox}>
          <span style={username}>Hi, {currentUser.name}</span>
          <button onClick={handleLogout} style={logoutBtn}>Logout</button>
        </div>
      </div>

      {/* FILTERS */}
      <Filters setFilters={setFilters} />

      {/* SUMMARY CARDS */}
      <SummaryCards transactions={userTransactions} />

      {/* ADD FORM */}
      <TransactionForm />

      {/* TABLE */}
      <TransactionTable filters={filters} />

    </div>
  );
}

/* BASIC INLINE CSS */
const container = {
  width: "100%",
  minHeight: "100vh",
  padding: "20px",
  background: "#f5f5f5",
  boxSizing: "border-box",
  fontFamily: "sans-serif"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  paddingBottom: "10px",
  marginBottom: "15px"
};

const title = {
  margin: 0,
  fontSize: "24px",
  fontWeight: 600
};

const userBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const username = {
  fontSize: "16px"
};

const logoutBtn = {
  padding: "6px 12px",
  border: "1px solid #444",
  background: "white",
  cursor: "pointer"
};
