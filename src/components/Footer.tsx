import React from "react";
import { footerLogo, footerWhiteLogo } from "../constants/images";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col sm:flex-row justify-between items-center">
      <div className="order-2 sm:order-1">
        <a href="/">
          <img src={footerLogo} alt="Logo" className="w-32 sm:w-auto dark:hidden" />
          <img src={footerWhiteLogo} alt="Logo" className="w-32 sm:w-auto hidden dark:block object-cover" />
        </a>
      </div>

      <div className="order-1 sm:order-2 flex items-center justify-between bg-neutral-200 dark:bg-[#20232D] px-4 py-2 rounded-[17px]">
        <ul className="flex space-x-4">
          <li className="text-black dark:text-white hover:text-green-darker font-semibold cursor-pointer">
            Home
          </li>
          <li className="text-black dark:text-white font-semibold hover:text-green-darker cursor-pointer">
            About
          </li>
          <li className="text-black dark:text-white font-semibold hover:text-green-darker cursor-pointer">
            Contact Us
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;