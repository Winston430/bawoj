// types/product.ts — Bawoj (new project)
export interface Category {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export type ProductUnit =
  | "kg" | "g" | "liter" | "ml" | "crate" | "tray" | "bag" | "bunch" | "piece" | "carton" | "sack";

export const productUnitLabel: Record<ProductUnit, string> = {
  kg: "Kg",
  g: "Grams",
  liter: "Liter",
  ml: "Ml",
  crate: "Crate",
  tray: "Tray",
  bag: "Bag",
  bunch: "Bunch",
  piece: "Piece",
  carton: "Carton",
  sack: "Sack",
};

export interface Product {
  id: string;
  name: string;
  unit: ProductUnit;
  categoryId: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  minimumStock: number;
  image: string | null;
  active: boolean;
  createdAt: number;
  updatedAt: number;
}

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export function getStockStatus(product: Pick<Product, "stock" | "minimumStock">): StockStatus {
  if (product.stock <= 0) return "out-of-stock";
  if (product.stock <= product.minimumStock) return "low-stock";
  return "in-stock";
}