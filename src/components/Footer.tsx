import React from "react";
import { footerLogo } from "../constants/images";

const Footer = () => {
  return (
    <footer className="w-full flex justify-between items-center">
      <div>
        <a href="/">
          <img src={footerLogo} alt="Logo" />
        </a>
      </div>

      <div className="flex items-center justify-between bg-neutral-200 px-4 py-2 rounded-[17px]">
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