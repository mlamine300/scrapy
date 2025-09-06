"use server";

import { Product } from "@/types";
import { connectToDB, updateProduct } from "../db/mongoose";
import { scrapeUrl } from "../scrapLib";
import { revalidatePath } from "next/cache";

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
