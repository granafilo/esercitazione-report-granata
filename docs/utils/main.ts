import type {
  TypeCarts,
  TypeUser,
  TypeUserCart,
  TypeProduct,
  Result,
} from "./types.js";

import { getCarts, getProducts, getUser, getUsers } from "./api.js";
import {
  formatPrice,
  getCartTotalPrice,
  getProductPrice,
  getRecap,
  printAllCartRecap,
  printCarts,
  userRecap,
} from "./logic.js";

const carts: TypeCarts = await getCarts();
console.log(printCarts(carts));

// ===================================================== \\

const user: TypeUser = await getUser(1);
const users: TypeUser[] = await getUsers();

//  ====================================================================== \\

const products: TypeProduct[] = await getProducts();
console.log(getRecap(carts, products, users));

// ================================================================ \\

console.log(getProductPrice(100, products));

// ======================================================================== \\
// console.log(printAllCartRecap(carts, products));
const allCartRecap = printAllCartRecap(carts, products);
allCartRecap.forEach((r) => {
  console.log(r);
});

console.log(userRecap(carts, products));
