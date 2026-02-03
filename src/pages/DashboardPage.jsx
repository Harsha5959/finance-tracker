import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";

import Filters from "../components/Filters";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

export default function DashboardPage() {
  /* ================= AUTH ================= */
  const currentUser = useSelector(state => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  /* ================= FILTER STATE ================= */
  const [filters, setFilters] = useState({});

  /* ================= TRANSACTIONS ================= */
  const allTransactions = useSelector(
    state => state.transaction.transactions
  );

  /* USER-SPECIFIC TRANSACTIONS */
  let userTransactions = allTransactions.filter(
    t => t.userId === currentUser.id
  );

  /* APPLY FILTERS (FOR SUMMARY CARDS) */
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
    <div className="page-container">
      {/* PAGE TITLE */}
      <h2>Dashboard</h2>

      {/* FILTERS */}
      <Filters setFilters={setFilters} />

      {/* SUMMARY CARDS */}
      <SummaryCards transactions={userTransactions} />

      {/* ADD TRANSACTION */}
      <TransactionForm />

      {/* TRANSACTION TABLE */}
      <TransactionTable filters={filters} />
    </div>
  );
}
