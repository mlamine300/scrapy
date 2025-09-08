"use client";
import React, { FormEvent } from "react";
import { scrape } from "../lib/actions";

const SearchBar = () => {
  const [urlTosearch, setUrlToSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    if (!isItAvalidUrl(urlTosearch)) {
      alert("Please enter a valid URL");
      setLoading(false);

      return;
    }

    await scrape(urlTosearch);
    setLoading(false);

    setUrlToSearch("");

    //scape the url
  };
  const isItAvalidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="px-4 gap-2 flex flex-row items-center mt-20"
    >
      <input
        type="link"
        placeholder="Enter product link"
        value={urlTosearch}
        onChange={(e) => setUrlToSearch(e.target.value)}
        className="border border-gray-300 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <button
        disabled={loading || !urlTosearch}
        //onClick={(e) => handleSearch(e)}
        type="submit"
        className="bg-primary disabled:bg-gray-700 cursor-pointer w-48 text-white px-6 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {loading ? "scrapping...." : " Scrape Now"}
      </button>
    </form>
  );
};

export default SearchBar;
