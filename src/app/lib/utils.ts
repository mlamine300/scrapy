import { NotificationType, Product } from "@/types";

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

const THRESHOLD_PERCENTAGE = 40;

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

export function extractDescription($: any) {
  // these are possible elements holding description of the product
  const selectors = [
    ".a-unordered-list .a-list-item",
    ".a-expander-content p",
    // Add more selectors here if needed
  ];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }

  // If no matching elements were found, return an empty string
  return "";
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct);

  if (scrapedProduct.price < lowestPrice) {
    return "LOWEST_PRICE" as NotificationType;
  }
  if (scrapedProduct.availability && !currentProduct.availability) {
    return "CHANGE_OF_STOCK" as NotificationType;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return "THRESHOLD_MET" as NotificationType;
  }

  return null;
};
