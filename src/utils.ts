import type {
  TypeCarts,
  TypeName,
  TypeProduct,
  TypeProductId,
  TypeUser,
  TypeUserId,
} from "./types.ts";

/* Metodo per ridurre a due decimali un importo - restituito come stringa */
export const formatPrice = (importo: number): string => {
  return importo.toFixed(2);
};

/* Metodo per formattare un numero DECIAMALE due valori dopo la virgola*/
export const roundToTwoDecimals = (value: number): number => {
  return parseFloat(value.toFixed(2));
};

/* Metodo per calcolare i ricavi partendo da prezzo e quantità */
export const calculateRevenue = (
  unitPrice: number,
  quantity: number,
): number => {
  return roundToTwoDecimals(unitPrice * quantity);
};

/* Ricerca del prodotto secondo l'id tra tutti i prodotti */
export const findProductById = (
  productId: TypeProductId,
  products: TypeProduct[],
): TypeProduct | undefined => {
  return products.find((p) => p.id === productId);
};

/* Ricerca dell'utente secondo l'id tra tutti i prodotti */
export const findUserById = (
  userId: TypeUserId,
  users: TypeUser[],
): TypeUser | undefined => {
  return users.find((u) => u.id === userId);
};

/* Metodo helper per formattare il nome -> semplice concat + trim */
export const formatFullName = (name?: TypeName): string => {
  if (!name) return "Utente sconosciuto";
  return `${name.firstname} ${name.lastname}`.trim();
};

/* Metodo per recuperare l'ultima data in ordine cronologico tra tutti i carrelli */
export const getMostRecentCartDate = (carts: TypeCarts): Date => {
  if (carts.length === 0) {
    throw new Error(
      "Impossibile determinare la data: nessun carrello disponibile",
    );
  }

  return carts.reduce((latest: Date, current) => {
    const currentDate = new Date(current.date);
    return currentDate.getTime() > latest.getTime() ? currentDate : latest;
  }, new Date(carts[0].date));
};

/* Metodo per recuperare il timespan dell'ultimo mese -> sfrutta il metodo per recuperare la data più recente del carrello */
export const getLastMonthRange = (
  anchorDate: Date,
  days: number = 30,
): { start: Date; end: Date } => {
  const end = new Date(anchorDate);
  const start = new Date(anchorDate.getTime() - days * 24 * 60 * 60 * 1000);
  return { start, end };
};

/* Metodo per verificare se una data è inclusa in un timespan */
export const isDateInRange = (
  date: string | Date,
  start: Date,
  end: Date,
): boolean => {
  const current = typeof date === "string" ? new Date(date) : date;
  const time = current.getTime();
  return time >= start.getTime() && time <= end.getTime();
};

/* Metodo helper per formattare una data come dd - MM - yyyy */
export const formatDate = (date: Date): string => {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day} - ${month} - ${year}`;
};
