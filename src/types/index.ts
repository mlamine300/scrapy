export interface Product {
  _id?: string;
  url: string;
  title: string;
  price: number;
  availability?: boolean;
  image: string;
  currency: string;
  discount?: string; // original string with "%"
  priceHistory: { price: number; date: Date }[]; // array of past prices
  discountRate: number; // numeric version of discount
  category: string;
  reviewsCount?: number;
  rating?: number; // 0–5 range
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  createdAt?: Date; // if using Mongoose timestamps
  updatedAt?: Date;
  users: { email: string; date: Date }[] | [];
  description?: string;
}

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
  image: string;
};
