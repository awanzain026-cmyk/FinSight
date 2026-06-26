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

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitCost: number;
  category: string;
}

export interface Receivable {
  id: string;
  customerName: string;
  invoiceNumber: string;
  amount: number;
  paidAmount: number;
  issueDate: string;
  dueDate: string;
  status: "pending" | "partial" | "paid";
}

export interface Payable {
  id: string;
  vendorName: string;
  billNumber: string;
  amount: number;
  paidAmount: number;
  issueDate: string;
  dueDate: string;
  status: "pending" | "partial" | "paid";
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

export const INVENTORY_CATEGORIES = [
  "Raw Materials",
  "Finished Goods",
  "Office Supplies",
  "Merchandise",
  "Equipment",
];
