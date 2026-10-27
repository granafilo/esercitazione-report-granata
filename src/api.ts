import type { TypeCarts, TypeProduct, TypeUser } from "./types.ts";

const BASE_URL = "https://fakestoreapi.com";

export const getCarts = async (): Promise<TypeCarts> => {
  try {
    const response = await fetch(`${BASE_URL}/carts`);
    if (response.status === 200) {
      return await response.json();
    }
    return [];
  } catch (error: unknown) {
    if (error instanceof Error) console.log("Error: \t", error.message);
    throw new Error("Errore: Servizio non disponibile");
  }
};

export const getUser = async <T>(value: T): Promise<TypeUser | null> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${value}`);
    if (response.status === 200) {
      return await response.json();
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    throw new Error("Errore: Servizio non disponibile");
  }
};

export const getUsers = async (): Promise<TypeUser[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (response.status === 200) {
      return await response.json();
    }
    return [];
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    throw new Error("Errore: Servizio non disponibile");
  }
};

export const getProducts = async (): Promise<TypeProduct[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (response.status === 200) {
      return await response.json();
    }
    return [];
  } catch (error: unknown) {
    if (error instanceof Error) console.log("Error: \t", error.message);
    throw new Error("Errore: Servizio non disponibile");
  }
};
