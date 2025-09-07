"use server";

import { Product } from "@/types";
import {
  findAllProduct,
  findProductByAttr,
  findProductById,
  updateProduct,
} from "../db/mongoose";
import { scrapeUrl } from "../scrapLib";
import { revalidatePath } from "next/cache";
import { SortOrder } from "mongoose";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function scrape(url: string) {
  //console.log("url from action", url);

  if (!url) {
    throw new Error("URL is required");
  }
  const data = (await scrapeUrl(url)) as Product;

  if (!data) {
    console.log("there is no data!!");
    return;
  }

  const _id = await updateProduct(data);
  if (_id) console.log("product added succefully!! ", _id);
  revalidatePath(`/products/${_id}`);

  //console.log("data from action", data);
}
export async function getProductById(id: string) {
  return findProductById(id);
}
export async function getProductsByCategory(category: string) {
  return findProductByAttr({ category });
}
export async function getAllProduct({
  start,
  limite,
  orderBy,
}: {
  start?: number;
  limite?: number;
  orderBy?: string | { [key: string]: SortOrder };
}) {
  //type SortOrder = -1 | 1 | 'asc' | 'ascending' | 'desc' | 'descending';
  const product = await findAllProduct({ start, limite, orderBy });
  return product;
  try {
  } catch (error) {
    console.log("Action:error getting all product", error);
  }
}
