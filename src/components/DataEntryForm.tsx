"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/lib/types";

export default function DataEntryForm() {
  const { addEntry } = useStore();
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(INCOME_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) return;
    if (!description.trim()) return;

    addEntry({
      type,
      amount: parsed,
      category,
      description: description.trim(),
      date: new Date(date).toISOString(),
    });

    setAmount("");
    setDescription("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass glass-hover rounded-xl p-6 glow"
    >
      <h2 className="text-lg font-semibold text-white mb-4">Add Entry</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setType("income");
              setCategory(INCOME_CATEGORIES[0]);
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              type === "income"
                ? "bg-success/20 text-success border border-success/30"
                : "bg-white/5 text-muted border border-transparent hover:bg-white/10"
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => {
              setType("expense");
              setCategory(EXPENSE_CATEGORIES[0]);
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              type === "expense"
                ? "bg-danger/20 text-danger border border-danger/30"
                : "bg-white/5 text-muted border border-transparent hover:bg-white/10"
            }`}
          >
            Expense
          </button>
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-muted-strong focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent/50 transition-colors"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-card">
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">Description</label>
          <input
            type="text"
            placeholder="What was this for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-muted-strong focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent/50 transition-colors [color-scheme:dark]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
        >
          Add Entry
        </button>
      </form>
    </motion.div>
  );
}
