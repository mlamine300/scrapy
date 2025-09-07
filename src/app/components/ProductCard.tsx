import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      className="flex flex-col w-full max-w-96 py-5 bg-gray-100 rounded-2xl"
      href={`/products/${product._id}`}
    >
      <Image
        src={product.image}
        width={200}
        height={200}
        alt={product.title}
        className="object-contain m-auto  bg-gray-50 rounded-xl px-2"
      />
      <div className="flex flex-col w-full md:h-[30%] px-5">
        <h3 className="text-xl font-semibold text-stone-900 my-2">
          {product.title}{" "}
        </h3>
        <div className="flex flex-row items-center justify-between px-4">
          <p className="text-lg font-semibold text-stone-500">
            {product.category}{" "}
          </p>
          <p className="text-lg text-black font-semibold">
            <span>{product.currency + " "} </span> {product.price}{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
