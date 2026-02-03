import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";

import Filters from "../components/Filters";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

export default function DashboardPage() {
  // Auth state
  const currentUser = useSelector(state => state.user.currentUser);

  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // Filters state (controlled by Filters component)
  const [filters, setFilters] = useState({});

  // All transactions from Redux
  const allTransactions = useSelector(
    state => state.transaction.transactions
  );

  // 1️⃣ User-specific transactions
  let userTransactions = allTransactions.filter(
    t => t.userId === currentUser.id
  );

  // 2️⃣ Apply filters (for SummaryCards)
  if (filters.type) {
    userTransactions = userTransactions.filter(
      t => t.type === filters.type
    );
  }

  if (filters.category) {
    userTransactions = userTransactions.filter(
      t => t.category === filters.category
    );
  }

  if (filters.mode) {
    userTransactions = userTransactions.filter(
      t => t.mode === filters.mode
    );
  }

  if (filters.month) {
    userTransactions = userTransactions.filter(
      t => new Date(t.date).getMonth() + 1 == filters.month
    );
  }

  return (
    <div style={container}>
      {/* PAGE TITLE */}
      <h2>Dashboard</h2>

      {/* FILTERS */}
      <Filters setFilters={setFilters} />

      {/* SUMMARY CARDS */}
      <SummaryCards transactions={userTransactions} />

      {/* ADD TRANSACTION FORM */}
      <TransactionForm />

      {/* TRANSACTION TABLE (filters passed) */}
      <TransactionTable filters={filters} />
    </div>
  );
}

/* BASIC PAGE STYLES */
const container = {
  padding: "20px",
  background: "#f5f5f5",
  minHeight: "100vh"
};
