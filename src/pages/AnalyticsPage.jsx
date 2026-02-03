import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Charts from "../components/Charts";

export default function AnalyticsPage() {
  // Auth state
  const currentUser = useSelector(state => state.user.currentUser);

  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // All transactions from Redux
  const allTransactions = useSelector(
    state => state.transaction.transactions
  );

  // User-specific transactions
  const userTransactions = allTransactions.filter(
    t => t.userId === currentUser.id
  );

  return (
    <div style={container}>
      <h2>Analytics</h2>

      {/* Charts only */}
      <Charts transactions={userTransactions} />
    </div>
  );
}

/* BASIC PAGE STYLES */
const container = {
  padding: "20px",
  background: "#f5f5f5",
  minHeight: "100vh"
};
