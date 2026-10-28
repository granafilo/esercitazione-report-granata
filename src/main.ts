import { getCarts, getProducts, getUsers } from "./api.ts";
import { generateReport1 } from "./report1.ts";
import { generateReport2 } from "./report2.ts";

const main = async () => {
  try {
    const [carts, products, users] = await Promise.all([
      getCarts(),
      getProducts(),
      getUsers(),
    ]);

    const report1 = generateReport1(carts, products);
    const report2 = generateReport2(carts, products, users);

    /* Utilizzo stringify per stampare come stringa il json -> 
    formattato andando a capo per ogni proprietà + 1 spazio di indentazione */
    console.log(JSON.stringify(report1, null, 1));
    console.log(JSON.stringify(report2, null, 1));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

main();
