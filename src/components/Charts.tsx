"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useStore } from "@/lib/store";
import { useMemo } from "react";

const COLORS = [
  "#6C63FF",
  "#a78bfa",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
];

function currencyTick(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value.toString();
}

export function MonthlyBarChart() {
  const { monthlyData } = useStore();

  const data = useMemo(
    () =>
      monthlyData.map((d) => ({
        month: d.month,
        Income: d.income,
        Expenses: d.expenses,
      })),
    [monthlyData]
  );

  const hasData = data.some((d) => d.Income > 0 || d.Expenses > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass glass-hover rounded-xl p-6 glow"
    >
      <h2 className="text-lg font-semibold text-white mb-4">
        Income vs Expenses
      </h2>
      {!hasData ? (
        <div className="h-64 flex items-center justify-center text-sm text-muted">
          Add entries to see monthly trends
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={currencyTick}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1a2e",
                  border: "1px solid rgba(108,99,255,0.3)",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                  fontSize: "13px",
                }}
              />
              <Bar
                dataKey="Income"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
              <Bar
                dataKey="Expenses"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}

export function ExpensePieChart() {
  const { categoryData } = useStore();

  const hasData = categoryData.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass glass-hover rounded-xl p-6 glow"
    >
      <h2 className="text-lg font-semibold text-white mb-4">
        Expense Breakdown
      </h2>
      {!hasData ? (
        <div className="h-64 flex items-center justify-center text-sm text-muted">
          Add expenses to see category breakdown
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                dataKey="value"
                paddingAngle={3}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1a1a2e",
                  border: "1px solid rgba(108,99,255,0.3)",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                  fontSize: "13px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
