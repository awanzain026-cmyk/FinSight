"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import type { Entry, MonthlyData, CategoryData } from "./types";

interface State {
  entries: Entry[];
}

type Action =
  | { type: "ADD_ENTRY"; payload: Entry }
  | { type: "DELETE_ENTRY"; payload: string }
  | { type: "LOAD_ENTRIES"; payload: Entry[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ENTRY":
      return { entries: [action.payload, ...state.entries] };
    case "DELETE_ENTRY":
      return {
        entries: state.entries.filter((e) => e.id !== action.payload),
      };
    case "LOAD_ENTRIES":
      return { entries: action.payload };
    default:
      return state;
  }
}

interface StoreContextValue {
  entries: Entry[];
  addEntry: (entry: Omit<Entry, "id">) => void;
  deleteEntry: (id: string) => void;
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  monthlyData: MonthlyData[];
  categoryData: CategoryData[];
  entryCount: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEY = "finsight_entries";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { entries: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Entry[];
        dispatch({ type: "LOAD_ENTRIES", payload: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.entries));
    } catch {
      // ignore
    }
  }, [state.entries]);

  const addEntry = useCallback((entry: Omit<Entry, "id">) => {
    dispatch({
      type: "ADD_ENTRY",
      payload: { ...entry, id: uuidv4() },
    });
  }, []);

  const deleteEntry = useCallback((id: string) => {
    dispatch({ type: "DELETE_ENTRY", payload: id });
  }, []);

  const { totalIncome, totalExpenses, netProfit, profitMargin, monthlyData, categoryData, entryCount } =
    useMemo(() => {
      const entries = state.entries;

      let income = 0;
      let expenses = 0;
      const monthlyMap: Record<string, { income: number; expenses: number }> = {};
      const categoryMap: Record<string, number> = {};

      for (const entry of entries) {
        if (entry.type === "income") {
          income += entry.amount;
        } else {
          expenses += entry.amount;
        }

        const month = entry.date.slice(0, 7);
        if (!monthlyMap[month]) {
          monthlyMap[month] = { income: 0, expenses: 0 };
        }
        if (entry.type === "income") {
          monthlyMap[month].income += entry.amount;
        } else {
          monthlyMap[month].expenses += entry.amount;
        }

        if (entry.type === "expense") {
          categoryMap[entry.category] = (categoryMap[entry.category] || 0) + entry.amount;
        }
      }

      const net = income - expenses;
      const margin = income > 0 ? (net / income) * 100 : 0;

      const monthly: MonthlyData[] = Object.entries(monthlyMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, data]) => ({
          month,
          income: data.income,
          expenses: data.expenses,
        }));

      const category: CategoryData[] = Object.entries(categoryMap)
        .sort(([, a], [, b]) => b - a)
        .map(([name, value]) => ({ name, value }));

      return {
        totalIncome: income,
        totalExpenses: expenses,
        netProfit: net,
        profitMargin: margin,
        monthlyData: monthly,
        categoryData: category,
        entryCount: entries.length,
      };
    }, [state.entries]);

  return (
    <StoreContext.Provider
      value={{
        entries: state.entries,
        addEntry,
        deleteEntry,
        totalIncome,
        totalExpenses,
        netProfit,
        profitMargin,
        monthlyData,
        categoryData,
        entryCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return ctx;
}
