export const getCarts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/carts");
    const status = await response.status;
    if (status == 200) return await response.json();
    return [];
  } catch (error: unknown) {
    if (error instanceof Error) console.log("Error: \t", error.message);
    throw new Error("Errore: Servizio non disponibile");
  }
};

export const getUser = async <T>(value: T) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/users/${value}`);
    const status = await response.status;
    if (status == 200) return await response.json();
    return [];
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    throw new Error("Errore: Servizio non disponibile");
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/users/`);
    const status = await response.status;
    if (status == 200) return await response.json();
    return [];
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    throw new Error("Errore: Servizio non disponibile");
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const status = await response.status;
    if (status == 200) return await response.json();
    return [];
  } catch (error: unknown) {
    if (error instanceof Error) console.log("Error: \t", error.message);
    throw new Error("Errore: Servizio non disponibile");
  }
};
