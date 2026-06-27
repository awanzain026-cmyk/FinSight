"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

interface Insight {
  text: string;
  type: "positive" | "warning" | "critical" | "info";
}

const icons = {
  positive: (
    <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>
  ),
  critical: (
    <svg className="w-5 h-5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  ),
};

const colors = {
  positive: "border-success/20 bg-success/5",
  warning: "border-warning/20 bg-warning/5",
  critical: "border-danger/20 bg-danger/5",
  info: "border-accent/20 bg-accent/5",
};

export default function AIInsights() {
  const { entries, totalIncome, totalExpenses, netProfit, profitMargin, formatAmount } = useStore();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const localInsights = useMemo((): Insight[] => {
    if (entries.length === 0) return [];
    const result: Insight[] = [];

    const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;
    if (expenseRatio > 80) {
      result.push({ text: `Your expenses are ${expenseRatio.toFixed(0)}% of income — costs are eating profits. Review rent, salary, and supplier costs urgently.`, type: "critical" });
    } else if (expenseRatio > 60) {
      result.push({ text: `Your expense ratio is ${expenseRatio.toFixed(0)}% — healthy but room to optimize. Look for cost-saving opportunities in supplies and utilities.`, type: "warning" });
    } else {
      result.push({ text: `Your expense ratio is ${expenseRatio.toFixed(0)}% — well controlled! You are keeping overhead low relative to revenue.`, type: "positive" });
    }

    const salaryTotal = entries.filter((e) => e.category === "Salaries").reduce((s, e) => s + e.amount, 0);
    if (salaryTotal > 0) {
      const salaryPct = (salaryTotal / totalExpenses) * 100;
      result.push({ text: `Staff salaries cost ${formatAmount(salaryTotal)} (${salaryPct.toFixed(0)}% of expenses) — your biggest overhead. Consider performance-based incentives.`, type: salaryPct > 40 ? "critical" : "warning" });
    }

    const rentTotal = entries.filter((e) => e.category === "Rent").reduce((s, e) => s + e.amount, 0);
    if (rentTotal > 0) {
      const rentPct = (rentTotal / totalExpenses) * 100;
      result.push({ text: `Rent is ${formatAmount(rentTotal)} (${rentPct.toFixed(0)}% of expenses) — ${rentPct > 25 ? "consider negotiating with your landlord or finding a more affordable space." : "within reasonable range."}`, type: rentPct > 25 ? "warning" : "info" });
    }

    const months = [...new Set(entries.filter((e) => e.type === "income").map((e) => e.date.slice(0, 7)))].sort();
    if (months.length >= 2) {
      const m1 = entries.filter((e) => e.type === "income" && e.date.startsWith(months[months.length - 1])).reduce((s, e) => s + e.amount, 0);
      const m2 = entries.filter((e) => e.type === "income" && e.date.startsWith(months[months.length - 2])).reduce((s, e) => s + e.amount, 0);
      if (m2 > 0) {
        const growth = ((m1 - m2) / m2) * 100;
        result.push({ text: `Sales ${growth >= 0 ? "grew" : "declined"} ${Math.abs(growth).toFixed(0)}% this month compared to last — ${growth >= 0 ? "strong performance! Keep the momentum." : "identify what changed and adjust your strategy."}`, type: growth >= 0 ? "positive" : "critical" });
      }
    }

    if (profitMargin > 0) {
      result.push({ text: `Your profit margin is ${profitMargin.toFixed(1)}% — ${profitMargin > 20 ? "above industry average. Excellent financial health!" : profitMargin > 10 ? "decent but could be improved." : "low. Focus on increasing prices or reducing costs."}`, type: profitMargin > 20 ? "positive" : profitMargin > 10 ? "info" : "critical" });
    }

    return result.slice(0, 4);
  }, [entries, totalIncome, totalExpenses, formatAmount]);

  const handleGetInsights = async () => {
    if (entries.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries, totalIncome, totalExpenses, netProfit, profitMargin }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const aiInsights: Insight[] = data.insights.map((t: string) => ({
        text: t,
        type: t.toLowerCase().includes("profit") || t.toLowerCase().includes("grew") || t.toLowerCase().includes("strong") ? "positive" : t.toLowerCase().includes("risk") || t.toLowerCase().includes("reduce") ? "critical" : "info",
      }));
      setInsights(aiInsights.length >= 4 ? aiInsights : localInsights);
    } catch {
      setInsights(localInsights);
    } finally {
      setLoading(false);
    }
  };

  const displayInsights = insights.length > 0 ? insights : localInsights;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass glass-hover rounded-xl p-6 glow"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">AI Insights</h2>
        <div className="flex items-center gap-2">
          {entries.length > 0 && <span className="w-2 h-2 rounded-full bg-success animate-pulse" />}
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
          </svg>
        </div>
      </div>

      <button
        onClick={handleGetInsights}
        disabled={loading || entries.length === 0}
        className="w-full py-2.5 bg-gradient-to-r from-accent to-purple-500 hover:from-accent-hover hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all mb-4"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Analyzing...
          </span>
        ) : (
          "Get AI Insights"
        )}
      </button>

      {entries.length === 0 && (
        <p className="text-xs text-muted text-center">Add some data first, or load demo data</p>
      )}

      {error && (
        <p className="text-xs text-danger text-center mb-3">{error}</p>
      )}

      {displayInsights.length > 0 && (
        <div className="space-y-2.5">
          {displayInsights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex gap-3 p-3 rounded-lg border ${colors[insight.type]}`}
            >
              <div className="mt-0.5 shrink-0">{icons[insight.type]}</div>
              <p className="text-sm text-white/80 leading-relaxed">{insight.text}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
