import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Charts({ transactions }) {
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const lineRef = useRef(null);

  const destroy = (ref) => {
    if (ref.current?.chart) ref.current.chart.destroy();
  };

  useEffect(() => {
    /* PIE – Expense by Category */
    destroy(pieRef);

    const expenseMap = {};
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => {
        expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
      });

    pieRef.current.chart = new Chart(pieRef.current, {
      type: "pie",
      options: { responsive: true, maintainAspectRatio: false },
      data: {
        labels: Object.keys(expenseMap),
        datasets: [{
          data: Object.values(expenseMap),
          backgroundColor: [
            "#ff6384", "#36a2eb", "#ffcd56",
            "#4bc0c0", "#9966ff", "#ff9f40"
          ]
        }]
      }
    });

    /* BAR – Income vs Expense */
    destroy(barRef);

    const income = transactions.filter(t => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);
    const expense = transactions.filter(t => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    barRef.current.chart = new Chart(barRef.current, {
      type: "bar",
      options: { responsive: true, maintainAspectRatio: false },
      data: {
        labels: ["Income", "Expense"],
        datasets: [{
          data: [income, expense],
          backgroundColor: ["#4caf50", "#f44336"]
        }]
      }
    });

    /* LINE – Monthly Trend */
    destroy(lineRef);

    const monthly = {};
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString("default", { month: "short" });
      monthly[month] = (monthly[month] || 0) +
        (t.type === "income" ? t.amount : -t.amount);
    });

    lineRef.current.chart = new Chart(lineRef.current, {
      type: "line",
      options: { responsive: true, maintainAspectRatio: false },
      data: {
        labels: Object.keys(monthly),
        datasets: [{
          label: "Net Amount",
          data: Object.values(monthly),
          borderColor: "#2196f3"
        }]
      }
    });

  }, [transactions]);

  return (
    <div style={grid}>
      <div style={card}><canvas ref={pieRef}></canvas></div>
      <div style={card}><canvas ref={barRef}></canvas></div>
      <div style={wideCard}><canvas ref={lineRef}></canvas></div>
    </div>
  );
}

/* STYLES */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px"
};

const card = {
  height: "250px",
  padding: "10px",
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "6px"
};

const wideCard = {
  gridColumn: "1 / -1",
  height: "280px",
  padding: "10px",
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "6px"
};
