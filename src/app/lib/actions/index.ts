"use server";
const scrapeUrl = async (url: string) => {
  // Simulate a delay to mimic an actual scraping process
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { success: true, message: `Scraped data from ${url}` };
};

export { scrapeUrl };
