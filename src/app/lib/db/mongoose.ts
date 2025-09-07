import { Product } from "@/types";
import mongoose from "mongoose";
import productModel from "../models/product.model";
import { SortOrder } from "mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

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
    let newProduct = {
      ...data,
      //priceHistory: [...excistingProduct.priceHistory, newProduct.price],

      priceHistory: [
        ...(existingProduct?.priceHistory || []),
        { price: data.price, date: new Date() },
      ],
    };
    newProduct = {
      ...newProduct,
      lowestPrice: getLowestPrice(newProduct),
      highestPrice: getHighestPrice(newProduct),
      averagePrice: getAveragePrice(newProduct),
    };
    if (existingProduct) {
      newProduct = {
        ...newProduct,
        //priceHistory: [...excistingProduct.priceHistory, newProduct.price],

        lowestPrice: getLowestPrice(newProduct),
        highestPrice: getHighestPrice(newProduct),
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
export async function findProductById(id: string) {
  try {
    await connectToDB();
    const product = await productModel.findOne({ _id: id });
    if (!product) {
      console.log("there is no such product with the id");
      return;
    }
    return product;
  } catch (error) {
    console.log("error getting product by id", error);
  }
}
export async function findProductByAttr(obj: object) {
  try {
    if (!obj || Object.keys(obj).length < 1) {
      console.log("you need filters to find product");
    }
    await connectToDB;
    const products = await productModel.find(obj);
    if (!products) {
      console.log(
        "there is no products with this " +
          Object.keys(obj).reduce((p, c) => {
            return p + "," + c;
          }, "{") +
          "}"
      );
      return;
    }
    return products;
  } catch (error) {
    console.log("error getting product by filter", error);
  }
}

export async function findAllProduct({
  start,
  limite,
  orderBy,
}: {
  start?: number;
  limite?: number;
  orderBy?: string | { [key: string]: SortOrder };
}) {
  try {
    await connectToDB();
    let querie = productModel.find();
    if (orderBy) querie = querie.sort(orderBy);
    if (start) querie = querie.skip(start);
    if (limite) querie = querie.limit(limite);

    const products = await querie.lean();
    if (!products) {
      console.log("there is no products in db");
      return;
    }
    return products;
    // const product = await productModel.find().sort(orderBy).limit(limite|);
  } catch (error) {
    console.log("could not fetch all product from db :", error);
  }
}
