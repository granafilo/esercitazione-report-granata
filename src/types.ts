export type TypeProductId = number;
export type TypeUnitsSold = number;
export type TypeUserId = number;

/* Prodotto dentro al carrello */
export type TypeCartProduct = {
  productId: TypeProductId;
  quantity: TypeUnitsSold;
};

/* Carrello di un utente */
export type TypeUserCart = {
  id: number;
  userId: TypeUserId;
  date: string;
  products: TypeCartProduct[];
  __v?: unknown;
};

/* Array di carrelli utente */
export type TypeCarts = TypeUserCart[];

/* Tipo per l'oggetto della geolocalizzazione */
export type TypeGeolocation = {
  lat: string;
  long: string;
};

/* Tipo dell'indirizzo */
export type TypeAddress = {
  geolocation: TypeGeolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
};

/* Tipo nome user */
export type TypeName = {
  firstname: string;
  lastname: string;
};

/* Tipo utente */
export type TypeUser = {
  address: TypeAddress;
  id: TypeUserId;
  email: string;
  username: string;
  password?: string;
  name: TypeName;
  phone: string;
  __v?: unknown;
};
/* Tipo per la valutazione di un prodotto */
export type TypeRating = {
  rate: number;
  count: number;
};

/* Tipo prodotto del catalogo */
export type TypeProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: TypeRating;
};

/* Tipo prodotto `classificato` */
export type TypeRankedProduct = {
  rank: number;
  productId: TypeProductId;
  title: string;
  category: string;
  unitPrice: number;
  unitsSold: TypeUnitsSold;
  revenue: number;
};

/* Tipo timespan */
export type TypePeriodDateRange = {
  start: string;
  end: string;
};

/* Tipo per il periodo dei prodotti */
export type TypeProductReportPeriod = {
  period: "all_time" | "last_month";
  dateRange: TypePeriodDateRange | null;
  items: TypeRankedProduct[];
};

/* Tipo per il report dei prodotti  */
export type TypeProductReport = {
  reportId: string;
  title: string;
  generatedAt: string;
  anchorDate: string;
  periods: {
    allTime: TypeProductReportPeriod;
    lastMonth: TypeProductReportPeriod;
  };
};

/* Tipo per un user classificato */
export type TypeRankedCustomer = {
  rank: number;
  userId: TypeUserId;
  username: string;
  fullName: string;
  email: string;
  totalOrders: number;
  totalUnitsPurchased: number;
  totalSpent: number;
};

/* Tipo per il periodo del report user  */
export type TypeCustomerReportPeriod = {
  period: "all_time" | "last_month";
  dateRange: TypePeriodDateRange | null;
  items: TypeRankedCustomer[];
};

/* Tipo per il report sugli utenti */
export type TypeCustomerReport = {
  reportId: string;
  title: string;
  generatedAt: string;
  anchorDate: string;
  periods: {
    allTime: TypeCustomerReportPeriod;
    lastMonth: TypeCustomerReportPeriod;
  };
};
