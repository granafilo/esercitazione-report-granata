import type {
  TypeCarts,
  TypeCustomerReport,
  TypeProduct,
  TypeRankedCustomer,
  TypeUser,
  TypeUserId,
} from "./types.ts";
import {
  findProductById,
  findUserById,
  formatDate,
  formatFullName,
  getLastMonthRange,
  getMostRecentCartDate,
  isDateInRange,
  roundToTwoDecimals,
} from "./utils.ts";

type AggregatedCustomerPurchases = {
  userId: TypeUserId;
  totalOrders: number;
  totalUnitsPurchased: number;
  totalSpent: number;
};

const aggregateCustomerPurchases = (
  carts: TypeCarts,
  products: TypeProduct[]
): AggregatedCustomerPurchases[] => {
  const purchasesMap = new Map<TypeUserId, AggregatedCustomerPurchases>();

  for (const cart of carts) {
    let current = purchasesMap.get(cart.userId);
    if (!current) {
      current = {
        userId: cart.userId,
        totalOrders: 0,
        totalUnitsPurchased: 0,
        totalSpent: 0,
      };
      purchasesMap.set(cart.userId, current);
    }

    current.totalOrders += 1;

    for (const item of cart.products) {
      current.totalUnitsPurchased += item.quantity;
      const product = findProductById(item.productId, products);
      const price = product ? product.price : 0;
      current.totalSpent += price * item.quantity;
    }
  }

  return Array.from(purchasesMap.values()).map((p) => ({
    ...p,
    totalSpent: roundToTwoDecimals(p.totalSpent),
  }));
};

const rankTopCustomers = (
  purchases: AggregatedCustomerPurchases[],
  users: TypeUser[],
  limit: number = 3
): TypeRankedCustomer[] => {
  return purchases
    .sort((a, b) => {
      if (b.totalSpent !== a.totalSpent) {
        return b.totalSpent - a.totalSpent;
      }
      if (b.totalUnitsPurchased !== a.totalUnitsPurchased) {
        return b.totalUnitsPurchased - a.totalUnitsPurchased;
      }
      return a.userId - b.userId;
    })
    .slice(0, limit)
    .map((item, index) => {
      const user = findUserById(item.userId, users);
      const username = user ? user.username : "sconosciuto";
      const fullName = user ? formatFullName(user.name) : "Utente sconosciuto";
      const email = user ? user.email : "N/D";

      return {
        rank: index + 1,
        userId: item.userId,
        username,
        fullName,
        email,
        totalOrders: item.totalOrders,
        totalUnitsPurchased: item.totalUnitsPurchased,
        totalSpent: item.totalSpent,
      };
    });
};

export const generateReport2 = (
  carts: TypeCarts,
  products: TypeProduct[],
  users: TypeUser[]
): TypeCustomerReport => {
  const anchorDate = getMostRecentCartDate(carts);
  const lastMonthRange = getLastMonthRange(anchorDate, 30);

  const lastMonthCarts = carts.filter((c) =>
    isDateInRange(c.date, lastMonthRange.start, lastMonthRange.end)
  );

  const allTimePurchases = aggregateCustomerPurchases(carts, products);
  const lastMonthPurchases = aggregateCustomerPurchases(
    lastMonthCarts,
    products
  );

  return {
    reportId: "report_2_top_customers",
    title: "Top 3 clienti per volume di acquisto",
    generatedAt: formatDate(new Date()),
    anchorDate: formatDate(anchorDate),
    periods: {
      allTime: {
        period: "all_time",
        dateRange: null,
        items: rankTopCustomers(allTimePurchases, users, 3),
      },
      lastMonth: {
        period: "last_month",
        dateRange: {
          start: formatDate(lastMonthRange.start),
          end: formatDate(lastMonthRange.end),
        },
        items: rankTopCustomers(lastMonthPurchases, users, 3),
      },
    },
  };
};

