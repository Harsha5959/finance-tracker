import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import Charts from "../components/Charts";

export default function AnalyticsPage() {
  const currentUser = useSelector(state => state.user.currentUser);
  if (!currentUser) return <Navigate to="/" />;

  const allTransactions = useSelector(
    state => state.transaction.transactions
  );

  const userTransactions = allTransactions.filter(
    t => t.userId === currentUser.id
  );

  /* ================= ANALYTICS FILTERS ================= */
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("");

  const filteredTransactions = userTransactions.filter(t => {
    const d = new Date(t.date);

    const matchYear =
      year === "all" ? true : d.getFullYear() === Number(year);

    const matchMonth =
      month ? d.getMonth() + 1 === Number(month) : true;

    return matchYear && matchMonth;
  });

  return (
    <div className="page-container">
      <h2>Analytics</h2>

      {/* ANALYTICS FILTER BAR */}
      <div className="filters">
        <select value={year} onChange={e => setYear(e.target.value)}>
          <option value="all">All Years</option>
          {[2023, 2024, 2025, 2026].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", {
                month: "long"
              })}
            </option>
          ))}
        </select>
      </div>

      {/* CHARTS */}
      <Charts
        transactions={filteredTransactions}
        selectedYear={year}
      />
    </div>
  );
}
