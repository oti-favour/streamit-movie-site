import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" text-white py-8 px-12">
      <div className="container  px-2">
        <div className="flex gap-x-4 pb-2">
          <div className="flex-col w-3/5">
            <ul className="flex text-[14px] gap-x-8">
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
            <div className="text-start pt-4">
              <p className="text-[14px] text-white ">
                © 2022 STREAMIT. All Rights Reserved. All videos and shows on
                this platform are trademarks of, and all related images and
                content are the property of, Streamit Inc. Duplication and copy
                of this is strictly prohibited. All rights reserved.
              </p>
            </div>
          </div>

          <div className="flex flex-col mr-8 ">
            <p className="font-semibold mb-8 ">Follow Us</p>
            <div className="flex text-xl  flex-row gap-x-5">
              <FaFacebook />
              <AiFillTwitterCircle />
              <FaGithub />
              <FaInstagram />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-semibold  mb-5">Streamit App</p>
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
      </div>
    </footer>
  );
}
