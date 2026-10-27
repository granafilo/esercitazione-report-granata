import type { TypeCarts, TypeProduct } from "./types.ts";

export const formatPrice = (importo: number): string => {
  return importo.toFixed(2);
};

export const roundToTwoDecimals = (value: number): number => {
  return parseFloat(value.toFixed(2));
};

export const calculateRevenue = (unitPrice: number, quantity: number): number => {
  return roundToTwoDecimals(unitPrice * quantity);
};

export const findProductById = (
  productId: number,
  products: TypeProduct[]
): TypeProduct | undefined => {
  return products.find((p) => p.id === productId);
};

export const getMostRecentCartDate = (carts: TypeCarts): Date => {
  if (carts.length === 0) {
    throw new Error("Impossibile determinare la data: nessun carrello disponibile");
  }

  return carts.reduce((latest: Date, current) => {
    const currentDate = new Date(current.date);
    return currentDate.getTime() > latest.getTime() ? currentDate : latest;
  }, new Date(carts[0].date));
};

export const getLastMonthRange = (
  anchorDate: Date,
  days: number = 30
): { start: Date; end: Date } => {
  const end = new Date(anchorDate);
  const start = new Date(anchorDate.getTime() - days * 24 * 60 * 60 * 1000);
  return { start, end };
};

export const isDateInRange = (
  date: string | Date,
  start: Date,
  end: Date
): boolean => {
  const current = typeof date === "string" ? new Date(date) : date;
  const time = current.getTime();
  return time >= start.getTime() && time <= end.getTime();
};

export const formatDate = (date: Date): string => {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day} - ${month} - ${year}`;
};
