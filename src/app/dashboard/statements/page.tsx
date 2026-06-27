"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { useMemo } from "react";

export default function StatementsPage() {
  const { entries, totalIncome, totalExpenses, netProfit, profitMargin, formatAmount } =
    useStore();

  const { incomeByCategory, expenseByCategory } = useMemo(() => {
    const inc: Record<string, number> = {};
    const exp: Record<string, number> = {};
    for (const e of entries) {
      if (e.type === "income")
        inc[e.category] = (inc[e.category] || 0) + e.amount;
      else exp[e.category] = (exp[e.category] || 0) + e.amount;
    }
    return { incomeByCategory: inc, expenseByCategory: exp };
  }, [entries]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Financial Statements
        </h1>
        <p className="text-muted text-sm mt-1">
          Income statement and financial summary
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass glass-hover rounded-xl p-6 glow"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            Income Statement
          </h2>
          <p className="text-xs text-muted mb-4 uppercase tracking-wider">
            For the period ending{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-2">
                Revenue
              </p>
              {Object.entries(incomeByCategory).length === 0 ? (
                <p className="text-sm text-muted/60">No income entries</p>
              ) : (
                Object.entries(incomeByCategory).map(([cat, amt]) => (
                  <div
                    key={cat}
                    className="flex justify-between py-1 text-sm"
                  >
                    <span className="text-white/70">{cat}</span>
                    <span className="text-success font-medium">
                      {formatAmount(amt, 2)}
                    </span>
                  </div>
                ))
              )}
              <div className="flex justify-between py-2 mt-1 border-t border-white/10 font-medium">
                <span className="text-white">Total Revenue</span>
                <span className="text-success">
                  {formatAmount(totalIncome, 2)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-muted uppercase tracking-wider mb-2">
                Expenses
              </p>
              {Object.entries(expenseByCategory).length === 0 ? (
                <p className="text-sm text-muted/60">No expense entries</p>
              ) : (
                Object.entries(expenseByCategory).map(([cat, amt]) => (
                  <div
                    key={cat}
                    className="flex justify-between py-1 text-sm"
                  >
                    <span className="text-white/70">{cat}</span>
                    <span className="text-danger font-medium">
                      {formatAmount(amt, 2)}
                    </span>
                  </div>
                ))
              )}
              <div className="flex justify-between py-2 mt-1 border-t border-white/10 font-medium">
                <span className="text-white">Total Expenses</span>
                <span className="text-danger">
                  {formatAmount(totalExpenses, 2)}
                </span>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t-2 border-accent/30">
              <div className="flex justify-between py-1">
                <span className="text-white font-semibold">Net Profit</span>
                <span
                  className={`font-bold text-lg ${
                    netProfit >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {formatAmount(netProfit, 2)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/70 text-sm">Profit Margin</span>
                <span
                  className={`font-semibold ${
                    netProfit >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {profitMargin.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass glass-hover rounded-xl p-6 glow"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            Balance Sheet
          </h2>
          <p className="text-xs text-muted mb-4 uppercase tracking-wider">
            Simplified overview
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-2">
                Assets
              </p>
              <div className="flex justify-between py-1.5 text-sm">
                <span className="text-white/70">Cash (Net Profit)</span>
                <span
                  className={`font-medium ${
                    netProfit >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {formatAmount(netProfit, 2)}
                </span>
              </div>
              <div className="flex justify-between py-1.5 text-sm border-t border-white/5">
                <span className="text-white font-medium">Total Assets</span>
                <span
                  className={`font-semibold ${
                    netProfit >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  ${netProfit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-2">
                Equity
              </p>
              <div className="flex justify-between py-1.5 text-sm">
                <span className="text-white/70">Retained Earnings</span>
                <span
                  className={`font-medium ${
                    netProfit >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {formatAmount(netProfit, 2)}
                </span>
              </div>
              <div className="flex justify-between py-1.5 text-sm border-t border-white/5">
                <span className="text-white font-medium">Total Equity</span>
                <span
                  className={`font-semibold ${
                    netProfit >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {formatAmount(netProfit, 2)}
                </span>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t-2 border-accent/30">
              <p className="text-xs text-muted text-center">
                Assets = Equity. No liabilities recorded yet.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
