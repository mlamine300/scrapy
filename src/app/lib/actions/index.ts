"use server";

import { Product } from "@/types";
import {
  findAllProduct,
  findProductByAttr,
  findProductById,
  updateProduct,
  updateProductById,
} from "../db/mongoose";
import { scrapeUrl } from "../scrapLib";
import { revalidatePath } from "next/cache";
import { SortOrder } from "mongoose";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { redirect } from "next/navigation";

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

  const product = await updateProduct(data);

  if (product._id) console.log("product added succefully!! ", product._id);
  revalidatePath(`/products/${product._id}`);

  redirect(`/products/${product._id}`);

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
export async function addUserEmailToProduct(id: string, emailAdress: string) {
  try {
    const product = (await findProductById(id)) as Product;
    if (!product) return;
    if (product.users.filter((u) => u.email === emailAdress).length > 0) return;

    await updateProductById(id, {
      users: product.users
        ? [...product.users, { email: emailAdress, date: new Date() }]
        : [{ email: emailAdress, date: new Date() }],
    });
    const email = await generateEmailBody(product, "WELCOME");
    const info = await sendEmail(email, [emailAdress]);
    console.log(info);
  } catch (error) {
    console.log("error adding user email to product ", error);
  }
}
