import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full flex items-center bg-black bg-opacity-50 py-4 px-8 gap-x-8 z-20">
        <div>
          <Link href="/">
            <div className="flex">
              <Image
                src="/images/logo.png"
                alt="Streamit"
                width={150}
                height={37}
                className="cursor-pointer object-contain"
              />
            </div>
          </Link>
        </div>

        <ul className="hidden md:flex space-x-8 text-sm text-white">
          <li>
            <Link href="/">
              <div>Home</div>
            </Link>
          </li>
          <li>
            <Link href="/series">
              <div>Series</div>
            </Link>
          </li>
          <li>
            <Link href="/movies">
              <div>Movies</div>
            </Link>
          </li>
          <li>
            <Link href="/pages">
              <div>Pages</div>
            </Link>
          </li>
          <li>
            <Link href="/pricing">
              <div>Pricing</div>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <div>Contact</div>
            </Link>
          </li>
        </ul>

        <div className="flex ml-auto space-x-6 pr-8">
          <div className="flex text-xl gap-x-4 mt-2 text-white">
            <FaSearch />
            <FaBell />
            <FaRegUserCircle />
          </div>

          <Link href="/subscribe">
            <div className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Subscribe Now
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}
