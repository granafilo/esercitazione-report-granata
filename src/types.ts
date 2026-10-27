export type TypeProductId = number;
export type TypeUnitsSold = number;

export type TypeCartProduct = {
  productId: TypeProductId;
  quantity: TypeUnitsSold;
};

export type TypeUserCart = {
  id: number;
  userId: number;
  date: string;
  products: TypeCartProduct[];
  __v?: unknown;
};

export type TypeCarts = TypeUserCart[];

export type TypeGeolocation = {
  lat: string;
  long: string;
};

export type TypeAddress = {
  geolocation: TypeGeolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
};

export type TypeName = {
  firstname: string;
  lastname: string;
};

export type TypeUser = {
  address: TypeAddress;
  id: number;
  email: string;
  username: string;
  password?: string;
  name: TypeName;
  phone: string;
  __v?: unknown;
};

export type TypeRating = {
  rate: number;
  count: number;
};

export type TypeProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: TypeRating;
};

export type TypeRankedProduct = {
  rank: number;
  productId: TypeProductId;
  title: string;
  category: string;
  unitPrice: number;
  unitsSold: TypeUnitsSold;
  revenue: number;
};

export type TypePeriodDateRange = {
  start: string;
  end: string;
};

export type TypeProductReportPeriod = {
  period: "all_time" | "last_month";
  dateRange: TypePeriodDateRange | null;
  items: TypeRankedProduct[];
};

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
