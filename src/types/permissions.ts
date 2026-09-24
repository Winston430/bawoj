// types/permissions.ts — Bawoj, only the "products" group's labels change
export type Permission =
  | "products.view"
  | "products.create"
  | "products.edit"
  | "products.delete"
  | "categories.view"
  | "categories.create"
  | "categories.edit"
  | "categories.delete"
  | "inventory.view"
  | "inventory.adjust"
  | "sales.view"
  | "sales.refund"
  | "reports.view"
  | "expenses.view"
  | "expenses.manage";

export const ALL_PERMISSIONS: Permission[] = [
  "products.view", "products.create", "products.edit", "products.delete",
  "categories.view", "categories.create", "categories.edit", "categories.delete",
  "inventory.view", "inventory.adjust",
  "sales.view", "sales.refund",
  "reports.view",
  "expenses.view", "expenses.manage",
];

export interface PermissionGroup {
  resource: string;
  label: string;
  permissions: { key: Permission; label: string }[];
}

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    resource: "products",
    label: "Items",
    permissions: [
      { key: "products.view", label: "View items" },
      { key: "products.create", label: "Add items" },
      { key: "products.edit", label: "Edit items" },
      { key: "products.delete", label: "Delete items" },
    ],
  },
  {
    resource: "categories",
    label: "Categories",
    permissions: [
      { key: "categories.view", label: "View categories" },
      { key: "categories.create", label: "Add categories" },
      { key: "categories.edit", label: "Edit categories" },
      { key: "categories.delete", label: "Delete categories" },
    ],
  },
  {
    resource: "inventory",
    label: "Inventory",
    permissions: [
      { key: "inventory.view", label: "View stock & movement history" },
      { key: "inventory.adjust", label: "Adjust stock" },
    ],
  },
  {
    resource: "sales",
    label: "Sales",
    permissions: [
      { key: "sales.view", label: "View all sales" },
      { key: "sales.refund", label: "Refund sales" },
    ],
  },
  {
    resource: "reports",
    label: "Reports",
    permissions: [{ key: "reports.view", label: "View reports" }],
  },
  {
    resource: "expenses",
    label: "Expenses",
    permissions: [
      { key: "expenses.view", label: "View expenses" },
      { key: "expenses.manage", label: "Add, edit & delete expenses" },
    ],
  },
];