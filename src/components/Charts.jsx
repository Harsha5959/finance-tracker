import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Charts({ transactions }) {
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const lineRef = useRef(null);

  const destroyChart = (ref) => {
    if (ref.current && ref.current.chart) {
      ref.current.chart.destroy();
    }
  };

  useEffect(() => {
    /* ================= PIE CHART: EXPENSE BY CATEGORY ================= */
    destroyChart(pieRef);

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
        datasets: [
          {
            data: Object.values(expenseMap),
            backgroundColor: [
              "#ef4444",
              "#f97316",
              "#eab308",
              "#22c55e",
              "#3b82f6",
              "#8b5cf6"
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    /* ================= BAR CHART: INCOME VS EXPENSE ================= */
    destroyChart(barRef);

    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    barRef.current.chart = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: ["Income", "Expense"],
        datasets: [
          {
            data: [income, expense],
            backgroundColor: ["#22c55e", "#ef4444"]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    /* ================= LINE CHART: MONTHLY TREND ================= */
    destroyChart(lineRef);

    const monthly = {};
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short"
      });

      monthly[month] =
        (monthly[month] || 0) +
        (t.type === "income" ? t.amount : -t.amount);
    });

    lineRef.current.chart = new Chart(lineRef.current, {
      type: "line",
      data: {
        labels: Object.keys(monthly),
        datasets: [
          {
            label: "Net Amount",
            data: Object.values(monthly),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59,130,246,0.2)",
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => {
      destroyChart(pieRef);
      destroyChart(barRef);
      destroyChart(lineRef);
    };
  }, [transactions]);

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
