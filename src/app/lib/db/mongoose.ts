import { Product } from "@/types";
import mongoose from "mongoose";
import productModel from "../models/product.model";

let isConnected = false;
export async function connectToDB() {
  mongoose.set("strict", true);
  const mongoDBUri = process.env.MONGODB_URI;
  if (!mongoDBUri) {
    console.log("could not connect!!!!");
    return;
  }
  if (!isConnected) mongoose.connect(mongoDBUri);
  isConnected = true;
  console.log("connected!!!");
}
export async function updateProduct(data: Product) {
  try {
    console.log(data);
    connectToDB();
    const existingProduct = (await productModel.findOne({
      url: data.url,
    })) as Product;
    let newProduct = data;
    if (existingProduct) {
      newProduct = {
        ...newProduct,
        //priceHistory: [...excistingProduct.priceHistory, newProduct.price],

        lowestPrice: Math.min(newProduct.price, existingProduct.lowestPrice),
        highestPrice: Math.max(existingProduct.highestPrice, newProduct.price),
        priceHistory: [
          ...(existingProduct?.priceHistory || []),
          { price: newProduct.price, date: new Date() },
        ],
      };
    }

    const product = await productModel.findOneAndUpdate(
      { url: newProduct.url },
      newProduct,
      {
        upsert: true,
        new: true,
      }
    );
    return product._id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("mongoose Error: ", error.message);
    } else {
      console.log("mongoose Error: ", error);
    }
    return null;
  }
}
