import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  HiOutlineHeart,
  HiOutlineUser,
  HiMagnifyingGlass,
} from "react-icons/hi2";

const Navbar = () => {
  const links = [
    {
      icon: <HiMagnifyingGlass className="w-8 h-8" />,
      name: "search",
      path: "/search",
    },
    {
      icon: <HiOutlineHeart className="w-8 h-8" />,
      name: "liked",
      path: "/liked",
    },
    {
      icon: <HiOutlineUser className="w-8 h-8" />,
      name: "user",
      path: "/user",
    },
  ];
  return (
    <header>
      <nav className="flex items-center px-6 border-b border-gray-200">
        <Link href="/" className="flex items-end gap-1 py-4">
          <Image
            src="/images/logo.png"
            alt="Scrapy Logo"
            width={57}
            height={57}
            className="object-contain"
          />
          <p className="text-2xl italic mb-1 text-primary font-semibold">
            {" "}
            Scrapy
          </p>
        </Link>
        <div className="flex items-center gap-4 ml-auto">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className="hover:bg-gray-100 rounded-lg p-2 transition"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
