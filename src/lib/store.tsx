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
import type {
  Entry,
  MonthlyData,
  CategoryData,
  InventoryItem,
  Receivable,
  Payable,
} from "./types";
import { formatCurrency, type CurrencyCode } from "./currency";
import { DEMO_DATA } from "./demoData";

interface State {
  entries: Entry[];
  inventory: InventoryItem[];
  receivables: Receivable[];
  payables: Payable[];
  currency: CurrencyCode;
  loading: boolean;
}

type Action =
  | { type: "ADD_ENTRY"; payload: Entry }
  | { type: "DELETE_ENTRY"; payload: string }
  | { type: "LOAD_ENTRIES"; payload: Entry[] }
  | { type: "ADD_INVENTORY"; payload: InventoryItem }
  | { type: "UPDATE_INVENTORY"; payload: InventoryItem }
  | { type: "DELETE_INVENTORY"; payload: string }
  | { type: "LOAD_INVENTORY"; payload: InventoryItem[] }
  | { type: "ADD_RECEIVABLE"; payload: Receivable }
  | { type: "UPDATE_RECEIVABLE"; payload: Receivable }
  | { type: "DELETE_RECEIVABLE"; payload: string }
  | { type: "LOAD_RECEIVABLES"; payload: Receivable[] }
  | { type: "ADD_PAYABLE"; payload: Payable }
  | { type: "UPDATE_PAYABLE"; payload: Payable }
  | { type: "DELETE_PAYABLE"; payload: string }
  | { type: "LOAD_PAYABLES"; payload: Payable[] }
  | { type: "SET_CURRENCY"; payload: CurrencyCode }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOAD_DEMO"; payload: { entries: Entry[]; inventory: InventoryItem[]; receivables: Receivable[]; payables: Payable[] } }
  | { type: "CLEAR_ALL" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ENTRY":
      return { ...state, entries: [action.payload, ...state.entries] };
    case "DELETE_ENTRY":
      return { ...state, entries: state.entries.filter((e) => e.id !== action.payload) };
    case "LOAD_ENTRIES":
      return { ...state, entries: action.payload };
    case "ADD_INVENTORY":
      return { ...state, inventory: [...state.inventory, action.payload] };
    case "UPDATE_INVENTORY":
      return { ...state, inventory: state.inventory.map((i) => (i.id === action.payload.id ? action.payload : i)) };
    case "DELETE_INVENTORY":
      return { ...state, inventory: state.inventory.filter((i) => i.id !== action.payload) };
    case "LOAD_INVENTORY":
      return { ...state, inventory: action.payload };
    case "ADD_RECEIVABLE":
      return { ...state, receivables: [...state.receivables, action.payload] };
    case "UPDATE_RECEIVABLE":
      return { ...state, receivables: state.receivables.map((r) => (r.id === action.payload.id ? action.payload : r)) };
    case "DELETE_RECEIVABLE":
      return { ...state, receivables: state.receivables.filter((r) => r.id !== action.payload) };
    case "LOAD_RECEIVABLES":
      return { ...state, receivables: action.payload };
    case "ADD_PAYABLE":
      return { ...state, payables: [...state.payables, action.payload] };
    case "UPDATE_PAYABLE":
      return { ...state, payables: state.payables.map((p) => (p.id === action.payload.id ? action.payload : p)) };
    case "DELETE_PAYABLE":
      return { ...state, payables: state.payables.filter((p) => p.id !== action.payload) };
    case "LOAD_PAYABLES":
      return { ...state, payables: action.payload };
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "LOAD_DEMO":
      return { ...state, ...action.payload };
    case "CLEAR_ALL":
      return { ...state, entries: [], inventory: [], receivables: [], payables: [] };
    default:
      return state;
  }
}

const STORAGE_PREFIX = "finsight_";

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

  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, "id">) => void;
  updateInventoryItem: (item: InventoryItem) => void;
  deleteInventoryItem: (id: string) => void;
  totalInventoryValue: number;

  receivables: Receivable[];
  addReceivable: (r: Omit<Receivable, "id">) => void;
  updateReceivable: (r: Receivable) => void;
  deleteReceivable: (id: string) => void;
  totalReceivablesOutstanding: number;

  payables: Payable[];
  addPayable: (p: Omit<Payable, "id">) => void;
  updatePayable: (p: Payable) => void;
  deletePayable: (id: string) => void;
  totalPayablesOutstanding: number;

  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatAmount: (amount: number, decimals?: number) => string;
  loading: boolean;
  loadDemoData: () => void;
  clearAllData: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return fallback;
}

function saveToStorage(key: string, data: unknown) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch {}
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    entries: [],
    inventory: [],
    receivables: [],
    payables: [],
    currency: "PKR",
    loading: true,
  });

  useEffect(() => {
    const entries = loadFromStorage<Entry[]>("entries", []);
    if (entries.length) dispatch({ type: "LOAD_ENTRIES", payload: entries });
    const inv = loadFromStorage<InventoryItem[]>("inventory", []);
    if (inv.length) dispatch({ type: "LOAD_INVENTORY", payload: inv });
    const recv = loadFromStorage<Receivable[]>("receivables", []);
    if (recv.length) dispatch({ type: "LOAD_RECEIVABLES", payload: recv });
    const pay = loadFromStorage<Payable[]>("payables", []);
    if (pay.length) dispatch({ type: "LOAD_PAYABLES", payload: pay });
    const cur = loadFromStorage<CurrencyCode>("currency", "PKR");
    dispatch({ type: "SET_CURRENCY", payload: cur });
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  useEffect(() => {
    saveToStorage("entries", state.entries);
  }, [state.entries]);
  useEffect(() => {
    saveToStorage("inventory", state.inventory);
  }, [state.inventory]);
  useEffect(() => {
    saveToStorage("receivables", state.receivables);
  }, [state.receivables]);
  useEffect(() => {
    saveToStorage("payables", state.payables);
  }, [state.payables]);
  useEffect(() => {
    saveToStorage("currency", state.currency);
  }, [state.currency]);

  const addEntry = useCallback((entry: Omit<Entry, "id">) => dispatch({ type: "ADD_ENTRY", payload: { ...entry, id: uuidv4() } }), []);
  const deleteEntry = useCallback((id: string) => dispatch({ type: "DELETE_ENTRY", payload: id }), []);
  const addInventoryItem = useCallback((item: Omit<InventoryItem, "id">) => dispatch({ type: "ADD_INVENTORY", payload: { ...item, id: uuidv4() } }), []);
  const updateInventoryItem = useCallback((item: InventoryItem) => dispatch({ type: "UPDATE_INVENTORY", payload: item }), []);
  const deleteInventoryItem = useCallback((id: string) => dispatch({ type: "DELETE_INVENTORY", payload: id }), []);
  const addReceivable = useCallback((r: Omit<Receivable, "id">) => dispatch({ type: "ADD_RECEIVABLE", payload: { ...r, id: uuidv4() } }), []);
  const updateReceivable = useCallback((r: Receivable) => dispatch({ type: "UPDATE_RECEIVABLE", payload: r }), []);
  const deleteReceivable = useCallback((id: string) => dispatch({ type: "DELETE_RECEIVABLE", payload: id }), []);
  const addPayable = useCallback((p: Omit<Payable, "id">) => dispatch({ type: "ADD_PAYABLE", payload: { ...p, id: uuidv4() } }), []);
  const updatePayable = useCallback((p: Payable) => dispatch({ type: "UPDATE_PAYABLE", payload: p }), []);
  const deletePayable = useCallback((id: string) => dispatch({ type: "DELETE_PAYABLE", payload: id }), []);
  const setCurrency = useCallback((c: CurrencyCode) => dispatch({ type: "SET_CURRENCY", payload: c }), []);

  const loadDemoData = useCallback(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    setTimeout(() => {
      const entries: Entry[] = DEMO_DATA.entries.map((e) => ({ ...e, id: uuidv4() }));
      const inventory: InventoryItem[] = DEMO_DATA.inventory.map((i) => ({ ...i, id: uuidv4() }));
      const receivables: Receivable[] = DEMO_DATA.receivables.map((r) => ({ ...r, id: uuidv4() }));
      const payables: Payable[] = DEMO_DATA.payables.map((p) => ({ ...p, id: uuidv4() }));
      dispatch({
        type: "LOAD_DEMO",
        payload: { entries, inventory, receivables, payables },
      });
      dispatch({ type: "SET_LOADING", payload: false });
    }, 600);
  }, []);

  const clearAllData = useCallback(() => dispatch({ type: "CLEAR_ALL" }), []);

  const computed = useMemo(() => {
    let income = 0;
    let expenses = 0;
    const monthlyMap: Record<string, { income: number; expenses: number }> = {};
    const categoryMap: Record<string, number> = {};

    for (const entry of state.entries) {
      if (entry.type === "income") income += entry.amount;
      else expenses += entry.amount;
      const month = entry.date.slice(0, 7);
      if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expenses: 0 };
      if (entry.type === "income") monthlyMap[month].income += entry.amount;
      else monthlyMap[month].expenses += entry.amount;
      if (entry.type === "expense") categoryMap[entry.category] = (categoryMap[entry.category] || 0) + entry.amount;
    }

    const net = income - expenses;
    const margin = income > 0 ? (net / income) * 100 : 0;

    const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthly: MonthlyData[] = Object.entries(monthlyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([m, d]) => ({ month: MONTH_NAMES[parseInt(m.slice(5)) - 1] || m.slice(5), income: d.income, expenses: d.expenses }));

    const categoryArr: CategoryData[] = Object.entries(categoryMap)
      .sort(([, a], [, b]) => b - a)
      .map(([name, value]) => ({ name, value }));

    const invVal = state.inventory.reduce((s, i) => s + i.quantity * i.unitCost, 0);
    const recvOut = state.receivables.reduce((s, r) => s + (r.amount - r.paidAmount), 0);
    const payOut = state.payables.reduce((s, p) => s + (p.amount - p.paidAmount), 0);

    return {
      totalIncome: income,
      totalExpenses: expenses,
      netProfit: net,
      profitMargin: margin,
      monthlyData: monthly,
      categoryData: categoryArr,
      entryCount: state.entries.length,
      totalInventoryValue: invVal,
      totalReceivablesOutstanding: recvOut,
      totalPayablesOutstanding: payOut,
    };
  }, [state]);

  const formatAmount = useCallback(
    (amount: number, decimals = 0) => formatCurrency(amount, state.currency, decimals),
    [state.currency]
  );

  return (
    <StoreContext.Provider
      value={{
        entries: state.entries,
        addEntry,
        deleteEntry,
        ...computed,

        inventory: state.inventory,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,

        receivables: state.receivables,
        addReceivable,
        updateReceivable,
        deleteReceivable,

        payables: state.payables,
        addPayable,
        updatePayable,
        deletePayable,

        currency: state.currency,
        setCurrency,
        formatAmount,
        loading: state.loading,
        loadDemoData,
        clearAllData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
