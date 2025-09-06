import * as cheerio from "cheerio";
import axios from "axios";
import { extractCurrency, extractDigits } from "../utils";
import { Product } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function scrapeUrl(url: string): Promise<Product | undefined> {
  // const rawHtml =
  //   '<div class="section-caption"><span>Latest IELTS test releases:</span></div>';
  // const $ = cheerio.load(rawHtml);
  // console.log($(".section-caption").text()); // ✅ prints: Latest IELTS test releases:

  const token = process.env.BRIGHTDATA_API_KEY;
  const zone = process.env.BRIGHTDATA_ZONE_NAME;

  try {
    const response = await axios.post(
      "https://api.brightdata.com/request",
      {
        zone,
        url,
        format: "json",
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    const $ = cheerio.load(response.data.body);
    const title = $("#productTitle").text();
    const price = extractDigits($(".priceToPay").first());
    const availabilityText = $("#availability span")
      .text()
      .trim()
      .toLowerCase();
    const availability =
      availabilityText === "in stock" || availabilityText === "en stock";
    const img =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image");
    const images = Object.keys(JSON.parse(img || ""));
    const currency = extractCurrency($(".a-price-symbol"));
    const discount = $(".savingsPercentage")
      .first()
      .text()
      .replace("/[-%]/g", "");
    const reviewsCount = extractDigits($("#acrCustomerReviewText").first());
    const rating = extractDigits(
      $("#acrPopover .a-size-base.a-color-base").first()
    );
    const data: Product = {
      url,
      title,
      price: Number(price),
      availability,
      image: images[0],
      currency,
      discount,
      priceHistory: [],
      discountRate: Number(discount.replace("%", "")),
      category: "category",
      reviewsCount: Number(reviewsCount),
      rating: Number(rating),
      lowestPrice: Number(price),
      highestPrice: Number(price),
    };
    //console.log(data);
    return data;
  } catch (error: Error | any) {
    if (error.response) {
      // Server responded with error code
      console.error(
        "❌ API Error:",
        error.response.status,
        error.response.statusText
      );
      console.error("Response body:", error.response.data);
    } else {
      // Something else went wrong (network, etc.)
      console.error("❌ Request failed:", error.message);
    }
  }
}
