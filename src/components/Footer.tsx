import React from "react";
import { footerLogo } from "../constants/images";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col sm:flex-row justify-between items-center">
      <div className="order-2 sm:order-1">
        <a href="/">
          <img src={footerLogo} alt="Logo" className="w-32 sm:w-auto" />
        </a>
      </div>

      <div className="order-1 sm:order-2 flex items-center justify-between bg-neutral-200 px-4 py-2 rounded-[17px]">
        <ul className="flex space-x-4">
          <li className="text-black hover:text-green-darker font-semibold cursor-pointer">
            Home
          </li>
          <li className="text-black font-semibold hover:text-green-darker cursor-pointer">
            About
          </li>
          <li className="text-black font-semibold hover:text-green-darker cursor-pointer">
            Contact Us
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;