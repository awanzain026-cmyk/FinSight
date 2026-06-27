"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function DataTable() {
  const { entries, deleteEntry, formatAmount } = useStore();

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass glass-hover rounded-xl p-6 glow"
      >
        <h2 className="text-lg font-semibold text-white mb-4">
          Transaction History
        </h2>
        <div className="h-32 flex items-center justify-center text-sm text-muted">
          No entries yet. Start by adding income or expenses above.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass glass-hover rounded-xl p-6 glow"
    >
      <h2 className="text-lg font-semibold text-white mb-4">
        Transaction History
        <span className="text-sm font-normal text-muted ml-2">
          ({entries.length})
        </span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 pr-4 text-muted font-medium text-xs uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-2 pr-4 text-muted font-medium text-xs uppercase tracking-wider">
                Type
              </th>
              <th className="text-left py-2 pr-4 text-muted font-medium text-xs uppercase tracking-wider">
                Category
              </th>
              <th className="text-left py-2 pr-4 text-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">
                Description
              </th>
              <th className="text-right py-2 pr-4 text-muted font-medium text-xs uppercase tracking-wider">
                Amount
              </th>
              <th className="text-right py-2 text-muted font-medium text-xs uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <motion.tr
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-3 pr-4 text-white/70 whitespace-nowrap">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      entry.type === "income"
                        ? "bg-success/20 text-success"
                        : "bg-danger/20 text-danger"
                    }`}
                  >
                    {entry.type}
                  </span>
                </td>
                <td className="py-3 pr-4 text-white/70 whitespace-nowrap">
                  {entry.category}
                </td>
                <td className="py-3 pr-4 text-white/50 text-xs hidden sm:table-cell max-w-[160px] truncate">
                  {entry.description}
                </td>
                <td
                  className={`py-3 pr-4 text-right font-medium whitespace-nowrap ${
                    entry.type === "income" ? "text-success" : "text-danger"
                  }`}
                >
                  {entry.type === "income" ? "+" : "-"}{formatAmount(entry.amount, 2)}
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-muted-strong hover:text-danger transition-colors p-1"
                    title="Delete entry"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
