"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function ProfitCard() {
  const { totalIncome, totalExpenses, netProfit, profitMargin, entryCount, formatAmount } =
    useStore();

  const isProfit = netProfit >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass glass-hover rounded-xl p-6 glow"
    >
      <h2 className="text-lg font-semibold text-white mb-4">
        Profit Overview
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            Income
          </p>
          <p className="text-xl font-bold text-success">
            +{formatAmount(totalIncome, 2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            Expenses
          </p>
          <p className="text-xl font-bold text-danger">
            -{formatAmount(totalExpenses, 2)}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-baseline justify-between">
          <p className="text-xs text-muted uppercase tracking-wider">Net Profit</p>
          <span
            className={`text-2xl font-bold ${
              isProfit ? "text-success" : "text-danger"
            }`}
          >
            {isProfit ? "+" : ""}{formatAmount(Math.abs(netProfit), 2)}
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <p className="text-xs text-muted uppercase tracking-wider">Profit Margin</p>
          <span
            className={`text-lg font-semibold ${
              isProfit ? "text-success" : "text-danger"
            }`}
          >
            {profitMargin.toFixed(1)}%
          </span>
        </div>
      </div>

      {entryCount === 0 && (
        <p className="mt-4 text-xs text-muted text-center">
          Add your first income or expense to see insights
        </p>
      )}
    </motion.div>
  );
}
