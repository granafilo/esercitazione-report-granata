export type TypeCartProduct = {
  productId: number;
  quantity: number;
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
  password: string;
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
  rating: TypeRating;
};

export type Result<T> = TypeProduct | string;
