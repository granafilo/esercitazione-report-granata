import type {
  Result,
  TypeCarts,
  TypeProduct,
  TypeUser,
  TypeUserCart,
} from "./types.js";

export const printCarts = (carts: TypeCarts): string[] => {
  let output: string[] = [];
  carts.forEach((element) => {
    element.products.forEach((p) =>
      output.push(`IdCarrello: ${element.id} \tProdotto:  ${p}`),
    );
  });
  return output;
};

export const getRecap = (
  carts: TypeCarts,
  products: TypeProduct[],
  users: TypeUser[],
): string => {
  return `
    Numero prodotti:\t${products.length}
    Numero carrelli:\t${carts.length},
    Numero Utenti:\t${users.length},
    `;
};

export const getProductPrice = <T>(
  productId: number,
  products: TypeProduct[],
): Result<T> => {
  const idProdottoTrovato = products.findIndex((p) => p.id === productId);
  if (idProdottoTrovato == -1)
    return `Prodotto con id: \\\\${productId}// non trovato, riprova con un id o un catalogo diverso `;
  else return products[idProdottoTrovato] || <TypeProduct>{};
};

export const formatPrice = (importo: number): string => {
  return importo.toFixed(2);
};

export const getCartTotalPrice = (
  cart: TypeUserCart,
  products: TypeProduct[],
): string => {
  let total: number = 0;
  cart.products.forEach((p) => {
    const prodottoCatalogo = getProductPrice(p.productId, products);
    if (typeof prodottoCatalogo == "string")
      return "Prodotto non trovato nel catalogo.";
    else total += prodottoCatalogo.price + p.quantity;
  });

  const output: string = formatPrice(total) + "€";
  return output;
};

export const getCartTotalPriceNumber = (str: string): number => {
  return parseFloat(str.slice(0, str.length));
};

export const printAllCartRecap = (
  carts: TypeCarts,
  products: TypeProduct[],
): string[] => {
  const output: string[] = [];
  carts.forEach((c, idx) =>
    output.push(
      `Carrello: ${idx} (user:${c.userId}): ${getCartTotalPrice(c, products)}`,
    ),
  );
  return output;
};

type TypeUserCartsRecap = {
  userId: number;
  totalPrice: number;
  totalCart: number;
};

export const userRecap = (
  carts: TypeCarts,
  products: TypeProduct[],
): TypeUserCartsRecap[] => {
  let recap: TypeUserCartsRecap[] = [];
  carts.forEach((c) => {
    const allUserCartsIdx: number = recap.findIndex(
      (uC) => uC.userId === c.userId,
    );

    const priceStr: string = getCartTotalPrice(c, products);
    console.log(priceStr);

    if (priceStr.indexOf("€") != -1) {
      const priceNum: number = getCartTotalPriceNumber(priceStr);
      console.log(priceNum);

      if (allUserCartsIdx != -1) {
        if (recap[allUserCartsIdx]) {
          recap[allUserCartsIdx].totalCart += 1;
          recap[allUserCartsIdx].totalPrice += priceNum;
        }
      } else {
        const newUserCartRecap: TypeUserCartsRecap = {
          userId: c.userId,
          totalPrice: priceNum,
          totalCart: 1,
        };
        recap.push(newUserCartRecap);
      }
    }
  });
  return recap;
};
