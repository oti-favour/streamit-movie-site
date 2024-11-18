"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaBell, FaRegUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { RiCloseLargeLine } from "react-icons/ri";
import Search from "./common/Search";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` flex justify-between items-center py-4 px-8 lg:px-16 gap-x-8 z-20 transition-colors duration-300 ${
        isScrolled ? "bg-[#191919]" : "bg-black bg-opacity-50"
      }`}
    >
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

      <ul className="hidden md:flex space-x-8 text-base text-white">
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
          <Link href="/contact">
            <div>Contact</div>
          </Link>
        </li>
      </ul>
      <div className="hidden md:flex ml-auto space-x-6 ">
        <div className="flex text-xl gap-x-4 mt-2 text-white">
          <Search />

          <FaRegUserCircle />
        </div>

        <Link href="/subscribe">
          <div className="bg-red-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Subscribe Now
          </div>
        </Link>
      </div>
      <div className="md:hidden flex ml-auto">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <HiMenu size={30} className="text-white" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#191919] text-white py-6 px-8 md:hidden flex flex-col items-start space-y-6 z-20">
          <div className="flex flex-row justify-between w-full">
            <Link href="/">
              <div className="">
                <Image
                  src="/images/logo.png"
                  alt="Streamit"
                  width={150}
                  height={37}
                  className="cursor-pointer object-contain"
                />
              </div>
            </Link>
            <div
              className="text-red-600 text-4xl ml-auto cursor-pointer"
              onClick={closeMenu}
            >
              <RiCloseLargeLine />
            </div>
          </div>
          <ul className="space-y-6">
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
              <Link href="/contact">
                <div>Contact</div>
              </Link>
            </li>
          </ul>

          <div className="flex text-xl gap-x-4 mt-6">
            <FaSearch className="text-2xl" />
            <FaBell className="text-2xl" />
            <FaRegUserCircle className="text-2xl" />
          </div>

          <Link href="/subscribe">
            <div className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mt-6">
              Subscribe Now
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
