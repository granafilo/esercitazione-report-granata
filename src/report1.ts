import type {
  TypeCarts,
  TypeProduct,
  TypeProductId,
  TypeProductReport,
  TypeRankedProduct,
  TypeUnitsSold,
} from "./types.ts";
import {
  calculateRevenue,
  findProductById,
  formatDate,
  getLastMonthRange,
  getMostRecentCartDate,
  isDateInRange,
} from "./utils.ts";

/* Prodotto [ID]: Quantità vendute [in aggiornamento] */
type AggregatedProductSales = {
  productId: TypeProductId;
  unitsSold: TypeUnitsSold;
};

/* Metodo che parte da tutti i carrelli e crea un array formato da un {{ AggregatedProductSales }} per ogni prodotto univoco */
const aggregateProductSales = (carts: TypeCarts): AggregatedProductSales[] => {
  const salesMap = new Map<TypeProductId, TypeUnitsSold>();

  for (const cart of carts) {
    for (const item of cart.products) {
      const currentQuantity: TypeUnitsSold = salesMap.get(item.productId) ?? 0;
      salesMap.set(item.productId, currentQuantity + item.quantity);
    }
  }

  return Array.from(salesMap.entries()).map(
    ([productId, unitsSold]: [TypeProductId, TypeUnitsSold]) => ({
      productId,
      unitsSold,
    }),
  );
};

/* Restituisce i primi 3 prodotti per unità vendute [se uguali primo per id] */
const rankTopProducts = (
  sales: AggregatedProductSales[],
  products: TypeProduct[],
  limit: number = 3,
): TypeRankedProduct[] => {
  return sales
    .sort((a, b) => {
      if (b.unitsSold !== a.unitsSold) {
        return b.unitsSold - a.unitsSold;
      }
      return a.productId - b.productId;
    })
    .slice(0, limit)
    .map((item, index) => {
      const product = findProductById(item.productId, products);
      const unitPrice = product ? product.price : 0;
      const title = product ? product.title : "Prodotto non a catalogo";
      const category = product ? product.category : "Sconosciuta";

      return {
        rank: index + 1,
        productId: item.productId,
        title,
        category,
        unitPrice,
        unitsSold: item.unitsSold,
        revenue: calculateRevenue(unitPrice, item.unitsSold),
      };
    });
};

/* Metodo finale per generare oggetto completo del report */
export const generateReport1 = (
  carts: TypeCarts,
  products: TypeProduct[],
): TypeProductReport => {
  const anchorDate = getMostRecentCartDate(carts);
  const lastMonthRange = getLastMonthRange(anchorDate, 30);

  const lastMonthCarts = carts.filter((c) =>
    isDateInRange(c.date, lastMonthRange.start, lastMonthRange.end),
  );

  const allTimeSales = aggregateProductSales(carts);
  const lastMonthSales = aggregateProductSales(lastMonthCarts);

  return {
    reportId: "report_1_top_products",
    title: "Top 3 prodotti più venduti",
    generatedAt: formatDate(new Date()),
    anchorDate: formatDate(anchorDate),
    periods: {
      allTime: {
        period: "all_time",
        dateRange: null,
        items: rankTopProducts(allTimeSales, products, 3),
      },
      lastMonth: {
        period: "last_month",
        dateRange: {
          start: formatDate(lastMonthRange.start),
          end: formatDate(lastMonthRange.end),
        },
        items: rankTopProducts(lastMonthSales, products, 3),
      },
    },
  };
};
