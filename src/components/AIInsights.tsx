"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function AIInsights() {
  const { entries, totalIncome, totalExpenses, netProfit, profitMargin } =
    useStore();
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetInsights = async () => {
    if (entries.length === 0) return;
    setLoading(true);
    setError("");
    setInsights([]);

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries,
          totalIncome,
          totalExpenses,
          netProfit,
          profitMargin,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      const data = await res.json();
      setInsights(data.insights);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to get insights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass glass-hover rounded-xl p-6 glow"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">AI Insights</h2>
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      </div>

      <button
        onClick={handleGetInsights}
        disabled={loading || entries.length === 0}
        className="w-full py-2.5 bg-gradient-to-r from-accent to-purple-500 hover:from-accent-hover hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Analyzing...
          </span>
        ) : (
          "Get AI Insights"
        )}
      </button>

      {entries.length === 0 && !loading && (
        <p className="mt-3 text-xs text-muted text-center">
          Add some data first, then ask AI for insights
        </p>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-xs text-danger text-center"
        >
          {error}
        </motion.p>
      )}

      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4 space-y-3"
        >
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-3 p-3 rounded-lg bg-white/5 border border-accent/10"
            >
              <span className="text-accent text-sm font-bold mt-0.5">
                {i + 1}.
              </span>
              <p className="text-sm text-white/80 leading-relaxed">{insight}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
