import Image from "next/image";
import SearchBar from "./components/SearchBar";
import ArticleCarousel from "./components/ArticleCarousel";
import { findAllProduct } from "./lib/db/mongoose";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const products = await findAllProduct({
    limite: 20,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <section className="flex flex-col max-w-[1440px] mx-auto bg-white my-20">
      <div className="flex flex-col xl:flex-row items-center justify-center min-h-screen py-2  gap-10">
        <div className=" xl:min-h-screen xl:gap-5 gap-2 h-full w-full flex flex-col">
          <div className="flex flex-row text-primary text-center px-4">
            <h2 className="text-xl font-semibold">
              Smart Shopping Starts Here:
            </h2>
            <Image
              src={"/assets/icons/arrow-right.svg"}
              alt="arrow"
              width={24}
              height={24}
              className="ml-2 mt-1"
            />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold  px-4 mt-6">
            Discover, Compare, and Save with{" "}
            <span className="text-primary font-extrabold">Scrapy</span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold italic">
              - Your Ultimate Shopping Companion!
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mt-8 px-4">
            Self-serve growth analytics that turn insights into conversions,
            engagement, and lasting retention{" "}
          </p>
          <SearchBar />
        </div>
        <div className=" xl:min-h-screen  h-full w-full flex items-center justify-center">
          <ArticleCarousel />
        </div>
      </div>
      {products && (
        <div className="flex flex-col py-2  gap-10 mt-10 max-sm:mx-auto ">
          <h3 className="text-3xl font-semibold text-stone-900 ">Trending</h3>
          <div className="flex max-sm:items-center flex-col xl:flex-row flex-wrap gap-8">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
