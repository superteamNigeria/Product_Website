import React, { useState } from "react";
import {
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { logo, whiteLogo } from "../constants/images";
import { filterColors } from "../constants/menu";
import Button from "./ui/Button";
import { ThemeToggle } from "./theme-toggle";
import { Link } from "react-router-dom";


const Header = () => {
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);
  const [hoveredColor, setHoveredColor] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bottonClicked, setBottonClicked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleColorPaletteToggle = () => {
    setIsColorPaletteVisible(!isColorPaletteVisible);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <section className="w-screen h-[80px] flex items-center justify-between px-4 bg-black md:hidden">
        <a href="/" className="flex-shrink-0">
          <img
            src={whiteLogo}
            alt="logo"
            className="h-8 w-auto sm:w-[39px] sm:h-[30px] md:hidden"
          />
          <img src={logo} alt="logo" className="hidden md:block h-8 w-auto" />
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="p-2" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="w-6 h-6 text-green-base"/> : <Menu className="w-6 h-6 text-green-base" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-[80px] right-4 w-[149.69px] h-[192.8px] rounded-[24px] p-[17.42px] bg-[#525866] flex flex-col gap-[3px] z-50 items-center justify-center">
            <ul className="flex flex-col gap-1">
              <li className="text-[#97CCB6] font-regular leading-relaxed cursor-pointer text-[9px] bg-[#20232D] rounded-[17px] w-28 h-9 flex items-center justify-center">
                Home
              </li>
              <li className="text-[#97CCB6] font-regular leading-relaxed cursor-pointer text-[9px] bg-[#20232D] rounded-[17px] w-28 h-9 flex items-center justify-center">
                About Us
              </li>
              <li className="text-[#97CCB6] font-regular leading-relaxed cursor-pointer text-[9px] bg-[#20232D] rounded-[17px] w-28 h-9 flex items-center justify-center">
                Contact Us
              </li>
            </ul>
            <Button
              title="Submit a Request"
              icon={<ChevronRight />}
              styles="bg-green-base text-[#E6F3ED] justify-middle font-regular text-[9px] leading-relaxed w-full text-balance"
            />
          </div>
        )}
      </section>

      {/* Desktop/Tablet Header */}
      <section className="w-full h-[80px] items-center justify-between px-4 hidden md:flex">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex-shrink-0">
            <img src={logo} alt="logo" className="h-8 w-auto dark:hidden" />
            <img
              src={whiteLogo}
              alt="logo"
              className="h-8 w-auto hidden dark:block"
            />
          </a>
          <div className="flex items-center bg-neutral-200 dark:bg-[#20232D] px-4 py-2.5 rounded-[17px]">
            <ul className="flex space-x-6">
              <li className="text-black dark:text-white hover:text-green-darker dark:hover:text-green-darker font-semibold cursor-pointer text-sm whitespace-nowrap">
                Home
              </li>
              <li className="text-black dark:text-white font-semibold hover:text-green-darker dark:hover:text-green-darker cursor-pointer text-sm whitespace-nowrap">
                About
              </li>
              <li className="text-black dark:text-white font-semibold hover:text-green-darker dark:hover:text-green-darker cursor-pointer text-sm whitespace-nowrap">
                Contact Us
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Color Palette Toggle */}
          <div className="relative">
            {isColorPaletteVisible && (
              <div className="absolute top-12 right-0 bg-neutral-200 rounded-[17px] p-3 z-10 min-w-max shadow-lg">
                <div className="flex gap-2">
                  {filterColors.map((color, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer relative flex items-center justify-center transition-all duration-300 ease-out overflow-hidden h-6 ${
                        hoveredColor === index
                          ? "rounded-full px-4 min-w-fit gap-2"
                          : "w-6 rounded-full"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onMouseEnter={() => setHoveredColor(index)}
                      onMouseLeave={() => setHoveredColor(null)}
                      onClick={() => {
                        console.log(`Selected: ${color.name}`);
                      }}
                    >
                      {hoveredColor === index ? (
                        <>
                          <span className="text-neutral-800 text-xs font-medium whitespace-nowrap">
                            {color.name}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
                        </>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Color Mode Toggle */}
          <ThemeToggle />

          {/* Submit Button */}
          <div className="flex-shrink-0 relative">
            <Button
              title="Submit a Request"
              icon={bottonClicked ? <X color="#FBFF00" /> : <ChevronRight />}
              styles="bg-green-base text-[#E6F3ED] justify-middle font-regular text-sm leading-relaxed w-full"
              onClick={() => setBottonClicked(!bottonClicked)}
            />

            {bottonClicked && (
              <div className="absolute top-full left-0 mt-2 flex flex-col gap-2 w-full">
                <Link to="/submit" className="w-full block">
                  <Button
                    title="Submit Product"
                    styles="border border-[#20232D] dark:border-[#E6F3ED] hover:border-green-base text-black dark:text-white justify-middle font-regular text-sm leading-relaxed w-full transition-all duration-300 ease-out"
                  />
                </Link>

                <Button
                  title="Request Edit"
                  styles="border border-[#20232D] dark:border-[#E6F3ED] hover:border-green-base text-black dark:text-white justify-middle font-regular text-sm leading-relaxed w-full transition-all duration-300 ease-out"
                  onClick={() => console.log("Contact Us clicked")}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
