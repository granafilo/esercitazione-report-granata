import { getCarts, getProducts } from "./api.ts";
import { generateReport1 } from "./report1.ts";

const main = async () => {
  try {
    const [carts, products] = await Promise.all([
      getCarts(),
      getProducts(),
    ]);

    const report1 = generateReport1(carts, products);
    console.log(JSON.stringify(report1, null, 2));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

main();
