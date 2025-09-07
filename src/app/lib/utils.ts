import { Product } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractDigits(...elements: any) {
  for (const elm of elements) {
    const elmText: string = elm.text().trim();
    if (elmText) {
      const price = elmText.replace(/[^0-9.]+/g, "");
      console.log("---------------------------");
      console.log(price);
      console.log("/////////////////////////");
      return price;
    }
  }
  return 0;
}
export function extractCurrency(elm: any) {
  const currency = elm.text().trim().slice(0, 1);
  if (currency) return currency;
  return "";
}

export function getAveragePrice(product: Product) {
  const priceHistory = product.priceHistory;
  if (!priceHistory || priceHistory.length === 0) return product.price;
  const avg = priceHistory.reduce((p, c) => {
    return p + c.price / priceHistory.length;
  }, 0);
  return avg;
}
export function getHighestPrice(product: Product) {
  const priceHistory = product.priceHistory.map((p) => p.price);
  if (!priceHistory || priceHistory.length === 0) return product.price;
  const max = Math.max(...priceHistory);

  return max;
}
export function getLowestPrice(product: Product) {
  const priceHistory = product.priceHistory.map((p) => p.price);
  if (!priceHistory || priceHistory.length === 0) return product.price;
  const min = Math.min(...priceHistory);
  return min;
}
