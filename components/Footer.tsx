import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" text-white py-8 px-16">
      <div className="flex flex-col gap-y-4 lg:flex-row pb-2">
        <div className="lg:flex-col w-full lg:mr-8 lg:w-3/5">
          <ul className="hidden  lg:flex text-[12px] gap-x-8">
            <li>
              <Link href="#" className="hover:text-gray-400">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Watch List
              </Link>
            </li>
          </ul>
          <ul className="block  lg:hidden text-[14px] space-y-4 ">
            <div className="flex flex-row gap-x-4 ">
              {" "}
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Privacy Policy
                </Link>
              </li>
            </div>

            <li>
              <Link href="#" className="hover:text-gray-400">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Watch List
              </Link>
            </li>
          </ul>
          <div className="text-start pt-4">
            <p className="text-[12px] text-white leading-loose ">
              © 2022 STREAMIT. All Rights Reserved. All videos and shows on this
              platform are trademarks of, and all related images and content are
              the property of, Streamit Inc. Duplication and copy of this is
              strictly prohibited. All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex flex-col  lg:w-1/5 ">
          <p className="font-semibold mb-4 lg:mb-8 ">Follow Us</p>
          <div className="flex text-xl  flex-row gap-x-5">
            <FaFacebook />
            <AiFillTwitterCircle />
            <FaGithub />
            <FaInstagram />
          </div>
        </div>

        <div className="flex flex-col lg:w-1/5 ">
          <p className="font-semibold  mb-2 lg:mb-5">Streamit App</p>
          <div className="flex items-center space-x-4 mt-2">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/appleappstore.png"
                  alt="App Store"
                  width={48}
                  height={48}
                  className="w-8 h-auto"
                />
                <span className="text-white text-xs">App Store</span>
              </div>
            </Link>

            <Link href="#">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/googleplay.png"
                  alt="Google Play Store"
                  width={48}
                  height={48}
                  className="w-8 h-auto"
                />
                <span className="text-white text-xs">Google Play Store</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
