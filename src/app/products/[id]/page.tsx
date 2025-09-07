/* eslint-disable @typescript-eslint/no-explicit-any */

import Modal, { ExitButton, ContentBox } from "@/app/components/Modal";
import ProductCard from "@/app/components/ProductCard";
import TrackButton from "@/app/components/TrackButton";
import TrackModal from "@/app/components/TrackModal";
import { getProductById, getProductsByCategory } from "@/app/lib/actions";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  HiOutlineHeart,
  HiOutlineBookmark,
  HiOutlineShare,
  HiOutlineStar,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineShoppingBag,
  HiXMark,
  HiOutlineEnvelope,
} from "react-icons/hi2";

const page = async ({ params }: { params: any }) => {
  const id = (await params)?.id;
  const product = (await getProductById(id)) as Product;
  // console.log(product);
  const similaireProduct = (
    await getProductsByCategory(product.category)
  )?.filter((p) => p.url != product.url) as Product[];

  return (
    <section className="flex max-w-[1440px] flex-col xl:p-20 p-5">
      <Modal>
        {" "}
        <div className="flex flex-col xl:flex-row gap-30">
          <div className="w-full h-full flex justify-center items-center border-gray-400 border rounded-2xl xl:p-20 p-2">
            <Image
              src={product.image}
              alt={product.title}
              height={496}
              width={385}
              className=" w-full h-full min-h-[60svh] object-contain"
            />
          </div>
          <div className="flex flex-col gap-6 w-full h-full">
            <h2 className="text-[28px] font-semibold">{product.title}</h2>
            <Link href={product.url} className="text-base opacity-50">
              Visit Product
            </Link>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row justify-around items-center gap-1 bg-red-400/30 p-2 rounded-lg max-w-16 text-base text-red-400 font-medium">
                <HiOutlineHeart />
                <p>{product.reviewsCount || 0}</p>
              </div>
              <div className="flex flex-row justify-around items-center bg-gray-400/30 p-2 rounded-lg max-w-16 text-lg font-medium">
                <HiOutlineBookmark />
              </div>
              <div className="flex flex-row justify-around items-center bg-gray-400/30 p-2 rounded-lg max-w-16 text-lg font-medium">
                <HiOutlineShare />
              </div>
            </div>
            <div className="bg-gray-200 h-0.5 w-full mb-2"></div>
            <div className="flex flex-row gap-8 items-center">
              <h2 className="text-3xl font-bold mr-5">
                <span className="m-1">{product.currency}</span>
                {product.price}
              </h2>
              <div className="flex flex-row gap-2 items-center">
                <div className="flex  flex-row py-2 px-4 items-center gap-1 text-sm xl:text-base bg-yellow-200/30 text-yellow-400 rounded-full font-semibold">
                  <HiOutlineStar />
                  <p>{product.rating}</p>
                </div>
                <div className="flex flex-row py-2 px-4 items-center gap-1 bg-gray-400/10 rounded-full ">
                  <HiOutlineChatBubbleLeftEllipsis />
                  <p className="font-semibold text-sm xl:text-base">
                    {product.reviewsCount}
                  </p>
                  <p className="xl:text-sm text-xs">Reviews</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full  gap-8 items-center">
              <p className="xl:text-xl text-base flex flex-row text-gray-600 line-through mr-16">
                <span>{product.currency + "  "}</span>
                {(product.price * (1 + Number(product.discount) / 100)).toFixed(
                  2
                )}
              </p>
              <div className="flex flex-row gap-2 items-center text-gray-400">
                <p className="text-base">
                  <span className="text-green-500">93% </span>
                  of buyers have recommended this.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 h-0.5 w-full mt-2"></div>
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col xl:flex-row items-center gap-5 w-full">
                <div className="flex flex-col gap-2 rounded-xl bg-gray-200/60 p-5 xl:min-w-[45%] w-full">
                  <p className="text-gray-700 text-xl">Current Price</p>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={"/assets/icons/price-tag.svg"}
                      alt="price-tag"
                      width={30}
                      height={30}
                    />
                    <h2 className="text-xl font-bold">
                      <span className="m-1">{product.currency}</span>
                      {product.price}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col gap-2 rounded-xl bg-gray-200/60 p-5 xl:min-w-[45%] w-full">
                  <p className="text-gray-700 text-xl">Average Price</p>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={"/assets/icons/chart.svg"}
                      alt="chart"
                      width={30}
                      height={30}
                    />
                    <h2 className="text-xl font-bold">
                      <span className="m-1">{product.currency}</span>
                      {product.price}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center gap-5 w-full">
                <div className="flex flex-col gap-2 rounded-xl bg-gray-200/60 p-5 xl:min-w-[45%] w-full">
                  <p className="text-gray-700 text-xl">Highest Price</p>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={"/assets/icons/arrow-up.svg"}
                      alt="price-high"
                      width={30}
                      height={30}
                    />
                    <h2 className="text-xl font-bold">
                      <span className="m-1">{product.currency}</span>
                      {product.highestPrice}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col gap-2 rounded-xl bg-gray-200/60 p-5 xl:min-w-[45%] w-full">
                  <p className="text-gray-700 text-xl">Lowest Price</p>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={"/assets/icons/arrow-down.svg"}
                      alt="chart"
                      width={30}
                      height={30}
                    />
                    <h2 className="text-xl font-bold">
                      <span className="m-1">{product.currency}</span>
                      {product.lowestPrice}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <TrackButton />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-stone-900 mt-10">
            Product Description
          </h2>
          <p className="text-lg font-medium text-stone-800 mt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            voluptates adipisci voluptatibus, repudiandae praesentium
            perspiciatis nesciunt odit aut quidem, inventore, labore fuga
            reprehenderit maxime eveniet officia distinctio accusamus ullam.
            Qui. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            voluptates adipisci voluptatibus, repudiandae praesentium
            perspiciatis nesciunt odit aut quidem, inventore, labore fuga
            reprehenderit maxime eveniet officia distinctio accusamus ullam.
            Qui. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            voluptates adipisci voluptatibus, repudiandae praesentium
            perspiciatis nesciunt odit aut quidem, inventore, labore fuga
            reprehenderit maxime eveniet officia distinctio accusamus ullam.
            Qui. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            voluptates adipisci voluptatibus, repudiandae praesentium
            perspiciatis nesciunt odit aut quidem, inventore, labore fuga
            reprehenderit maxime eveniet officia distinctio accusamus ullam.
            Qui. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            voluptates adipisci voluptatibus, repudiandae praesentium
            perspiciatis nesciunt odit aut quidem, inventore, labore fuga
            reprehenderit maxime eveniet officia distinctio accusamus ullam.
            Qui.
          </p>
          <button className="text-slate-50 text-base bg-stone-950 font-semibold cursor-pointer mx-auto px-8 py-4 rounded-full hover:bg-stone-500 flex flex-row items-center gap-4">
            <HiOutlineShoppingBag className="w-5 h-5 text-xl font-bold" />
            Buy Now
          </button>
        </div>
        <ContentBox className="w-[90%] sm:w-[400px] min-h-96 bg-slate-50 ">
          <TrackModal />
        </ContentBox>
        {similaireProduct && (
          <div className="flex flex-col mt-10">
            <h2 className="text-2xl font-semibold text-stone-900 mt-10">
              Similar Products
            </h2>

            <div className="flex flex-row flex-wrap gap-8">
              {similaireProduct.map((prod, index) => (
                <ProductCard product={prod} key={index} />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default page;
