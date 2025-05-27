import React, { useState } from "react";
import { ChevronRight, Search, SlidersHorizontal, Menu } from "lucide-react";
import { logo, whiteLogo } from "../constants/images";
import { filterColors } from "../constants/menu";
import Button from "./ui/Button";

const Header = () => {
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);
  const [hoveredColor, setHoveredColor] = useState(null);

  const handleColorPaletteToggle = () => {
    setIsColorPaletteVisible(!isColorPaletteVisible);
  };

  return (
    <>
      {/* Mobile Header */}
      <section className="w-screen h-[80px] flex items-center justify-between px-4 bg-black md:hidden">
        <a href="/" className="flex-shrink-0">
          <img src={whiteLogo} alt="logo" className="h-8 w-auto sm:w-[39px] sm:h-[30px] md:hidden" />
          <img src={logo} alt="logo" className="hidden md:block h-8 w-auto" />
        </a>
        <button className="p-2">
          <Menu className="w-6 h-6 text-green-base" />
        </button>
      </section>

      {/* Desktop/Tablet Header */}
      <section className="w-full h-[80px] items-center justify-between px-4 hidden md:flex">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex-shrink-0">
            <img src={logo} alt="logo" className="h-8 w-auto" />
          </a>
          <div className="flex items-center bg-neutral-200 px-4 py-2.5 rounded-[17px]">
            <ul className="flex space-x-6">
              <li className="text-black hover:text-green-darker font-semibold cursor-pointer text-sm whitespace-nowrap">
                Home
              </li>
              <li className="text-black font-semibold hover:text-green-darker cursor-pointer text-sm whitespace-nowrap">
                About
              </li>
              <li className="text-black font-semibold hover:text-green-darker cursor-pointer text-sm whitespace-nowrap">
                Contact Us
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Color Palette Toggle */}
          <div className="relative">
            {/* <div
              className="flex items-center justify-center bg-[#E2E4E9] p-2.5 rounded-[17px] cursor-pointer hover:bg-[#D1D5DB] transition-colors w-10 h-10"
              onClick={handleColorPaletteToggle}
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </div> */}

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

          {/* Submit Button */}
          <div className="flex-shrink-0">
            <Button
              title="Submit"
              icon={<ChevronRight />}
              styles="bg-green-base text-[#E6F3ED] font-regular text-sm"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;