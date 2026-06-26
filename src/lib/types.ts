export interface Entry {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export const INCOME_CATEGORIES = [
  "Sales",
  "Services",
  "Consulting",
  "Investment",
  "Other Income",
];

export const EXPENSE_CATEGORIES = [
  "Rent",
  "Utilities",
  "Salaries",
  "Marketing",
  "Supplies",
  "Software",
  "Travel",
  "Other Expense",
];
