/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractDigits(...elements: any) {
  for (const elm of elements) {
    const elmText: string = elm.text().trim();
    if (elmText) {
      const price = elmText.replace(/[^0-9.,]+/g, "");
      return price;
    }
  }
  return "";
}
export function extractCurrency(elm: any) {
  const currency = elm.text().trim().slice(0, 1);
  if (currency) return currency;
  return "";
}
