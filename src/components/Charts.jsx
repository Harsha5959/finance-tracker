import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Charts({ transactions, selectedYear }) {
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const lineRef = useRef(null);

  const destroy = (ref) => {
    if (ref.current?.chart) ref.current.chart.destroy();
  };

  useEffect(() => {
    /* ================= PIE: EXPENSE BY CATEGORY ================= */
    destroy(pieRef);

    const expenseMap = {};
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => {
        expenseMap[t.category] =
          (expenseMap[t.category] || 0) + t.amount;
      });

    pieRef.current.chart = new Chart(pieRef.current, {
      type: "pie",
      data: {
        labels: Object.keys(expenseMap),
        datasets: [{
          label: "Expense by Category",
          data: Object.values(expenseMap),
          backgroundColor: [
            "#ef4444", "#f97316", "#eab308",
            "#22c55e", "#3b82f6", "#8b5cf6"
          ]
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    /* ================= BAR: INCOME VS EXPENSE ================= */
    destroy(barRef);

    const income = transactions
      .filter(t => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    barRef.current.chart = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: ["Income", "Expense"],
        datasets: [{
          label: "Income vs Expense",
          data: [income, expense],
          backgroundColor: ["#22c55e", "#ef4444"]
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    /* ================= LINE: MONTHLY SAVINGS ================= */
    destroy(lineRef);

    const monthlySavings = {};

    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short"
      });

      if (!monthlySavings[month]) {
        monthlySavings[month] = 0;
      }

      monthlySavings[month] +=
        t.type === "income" ? t.amount : -t.amount;
    });

    const yearLabel =
      selectedYear === "all" ? "All Years" : selectedYear;

    lineRef.current.chart = new Chart(lineRef.current, {
      type: "line",
      data: {
        labels: Object.keys(monthlySavings),
        datasets: [{
          label: `Savings (${yearLabel})`,
          data: Object.values(monthlySavings),
          borderColor: "#22c55e",
          backgroundColor: "rgba(34,197,94,0.25)",
          fill: true,
          tension: 0.35
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

  }, [transactions, selectedYear]);

  return (
    <div className="chart-grid">
      <div className="chart-card">
        <canvas ref={pieRef}></canvas>
      </div>

      <div className="chart-card">
        <canvas ref={barRef}></canvas>
      </div>

      <div className="chart-card chart-wide">
        <canvas ref={lineRef}></canvas>
      </div>
    </div>
  );
}
