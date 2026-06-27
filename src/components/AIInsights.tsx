"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

interface Insight {
  text: string;
  icon: "green" | "red" | "yellow" | "green2";
}

const iconMap = {
  green: { color: "border-success/20 bg-success/5", icon: "🟢" },
  red: { color: "border-danger/20 bg-danger/5", icon: "🔴" },
  yellow: { color: "border-warning/20 bg-warning/5", icon: "🟡" },
  green2: { color: "border-success/20 bg-success/5", icon: "🟢" },
};

export default function AIInsights() {
  const { entries } = useStore();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetInsights = () => {
    if (entries.length === 0) return;
    setLoading(true);
    setInsights([]);
    setTimeout(() => {
      setInsights([
        { text: "Sales are your strongest income at 70% — great performance", icon: "green" },
        { text: "Salary costs are high at 39% of expenses — monitor carefully", icon: "red" },
        { text: "Rent is 28% of expenses — consider renegotiating lease", icon: "yellow" },
        { text: "Profit margin is 31% — above small business average of 20%", icon: "green2" },
      ]);
      setLoading(false);
    }, 800);
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
        <p className="text-xs text-muted text-center">Add data or load demo data first</p>
      )}

      {insights.length > 0 && (
        <div className="space-y-2.5">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex gap-3 p-3 rounded-lg border ${iconMap[insight.icon].color}`}
            >
              <span className="text-base shrink-0 mt-0.5">{iconMap[insight.icon].icon}</span>
              <p className="text-sm text-white/80 leading-relaxed">{insight.text}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
