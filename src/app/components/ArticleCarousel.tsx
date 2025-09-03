"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const ArticleCarousel = () => {
  const articles = [
    { src: "/assets/images/hero-1.svg", alt: "Article 1" },
    { src: "/assets/images/hero-2.svg", alt: "Article 2" },
    { src: "/assets/images/hero-3.svg", alt: "Article 3" },
    { src: "/assets/images/hero-4.svg", alt: "Article 4" },
    { src: "/assets/images/hero-5.svg", alt: "Article 5" },
  ];
  return (
    <div className="  w-full max-xl:m-10 bg-gray-300 xl:rounded-[60px] rounded-xl p-10 ">
      <Carousel
        showArrows={false}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={2000}
      >
        {articles.map((article, index) => (
          <div
            key={index}
            className="h-full w-full flex items-center justify-center"
          >
            <Image
              src={article.src}
              alt={article.alt}
              className="h-full w-full object-contain"
              width={500}
              height={500}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ArticleCarousel;
