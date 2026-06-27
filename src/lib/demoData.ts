import type { Entry, InventoryItem, Receivable, Payable } from "./types";

export interface DemoData {
  entries: Omit<Entry, "id">[];
  inventory: Omit<InventoryItem, "id">[];
  receivables: Omit<Receivable, "id">[];
  payables: Omit<Payable, "id">[];
}

export const DEMO_DATA: DemoData = {
  entries: [
    { type: "income", amount: 45000, category: "Sales", description: "Al-Zain Traders - Monthly Sales", date: "2026-06-01T10:00:00.000Z" },
    { type: "income", amount: 12000, category: "Services", description: "Al-Zain Traders - Services", date: "2026-06-05T10:00:00.000Z" },
    { type: "income", amount: 8000, category: "Consulting", description: "Al-Zain Traders - Consulting", date: "2026-06-10T10:00:00.000Z" },
    { type: "expense", amount: 18000, category: "Rent", description: "Shop Rent - June", date: "2026-06-01T00:00:00.000Z" },
    { type: "expense", amount: 12000, category: "Salaries", description: "Staff Salaries - June", date: "2026-06-28T00:00:00.000Z" },
    { type: "expense", amount: 3200, category: "Utilities", description: "Electricity Bill - June", date: "2026-06-25T00:00:00.000Z" },
    { type: "expense", amount: 10000, category: "Supplies", description: "Stock Purchase - June", date: "2026-06-10T00:00:00.000Z" },
    { type: "expense", amount: 2000, category: "Miscellaneous", description: "Misc Expenses - June", date: "2026-06-20T00:00:00.000Z" },
  ],
  inventory: [
    { name: "Cotton Shirts", sku: "CS-001", quantity: 120, unitCost: 800, category: "Merchandise" },
    { name: "Denim Jeans", sku: "DJ-002", quantity: 80, unitCost: 1500, category: "Merchandise" },
    { name: "Office Chairs", sku: "OC-003", quantity: 15, unitCost: 12000, category: "Equipment" },
  ],
  receivables: [
    { customerName: "Al-Rashid Store", invoiceNumber: "INV-001", amount: 25000, paidAmount: 10000, issueDate: "2026-06-01", dueDate: "2026-07-01", status: "partial" },
    { customerName: "City Mart", invoiceNumber: "INV-002", amount: 18000, paidAmount: 0, issueDate: "2026-06-15", dueDate: "2026-07-15", status: "pending" },
    { customerName: "Super Bazaar", invoiceNumber: "INV-003", amount: 22000, paidAmount: 22000, issueDate: "2026-05-20", dueDate: "2026-06-20", status: "paid" },
  ],
  payables: [
    { vendorName: "Textile Mills Ltd", billNumber: "BILL-001", amount: 35000, paidAmount: 15000, issueDate: "2026-06-05", dueDate: "2026-07-05", status: "partial" },
    { vendorName: "Electric Supply Co", billNumber: "BILL-002", amount: 3200, paidAmount: 0, issueDate: "2026-06-25", dueDate: "2026-07-10", status: "pending" },
    { vendorName: "Landlord Associates", billNumber: "BILL-003", amount: 18000, paidAmount: 18000, issueDate: "2026-06-01", dueDate: "2026-06-15", status: "paid" },
  ],
};
