import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Charts from "../components/Charts";

export default function AnalyticsPage() {
  /* ================= AUTH ================= */
  const currentUser = useSelector(state => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  /* ================= TRANSACTIONS ================= */
  const allTransactions = useSelector(
    state => state.transaction.transactions
  );

  const userTransactions = allTransactions.filter(
    t => t.userId === currentUser.id
  );

  return (
    <div className="page-container">
      <h2>Analytics</h2>

      {/* ONLY CHARTS HERE */}
      <Charts transactions={userTransactions} />
    </div>
  );
}
