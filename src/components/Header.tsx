import React, { useState } from "react";
import { ChevronRight, Search, SlidersHorizontal, Menu, Sun, Moon } from "lucide-react";
import { logo, whiteLogo } from "../constants/images";
import { filterColors } from "../constants/menu";
import Button from "./ui/Button";
import Switch from "./ui/Swtich";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);
  const [hoveredColor, setHoveredColor] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false)

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
            <img src={logo} alt="logo" className="h-8 w-auto dark:hidden" />
            <img src={whiteLogo} alt="logo" className="h-8 w-auto hidden dark:block" />
          </a>
          <div className="flex items-center bg-neutral-200 dark:bg-[#20232D] px-4 py-2.5 rounded-[17px]">
            <ul className="flex space-x-6">
              <li className="text-black dark:text-white hover:text-green-darker font-semibold cursor-pointer text-sm whitespace-nowrap">
                Home
              </li>
              <li className="text-black dark:text-white font-semibold hover:text-green-darker cursor-pointer text-sm whitespace-nowrap">
                About
              </li>
              <li className="text-black dark:text-white font-semibold hover:text-green-darker cursor-pointer text-sm whitespace-nowrap">
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

          {/* Color Mode Toggle */}
          <div className="relative flex items-center gap-2">
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-[#6CB798]" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
            <Switch
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
              className={`${
                isDarkMode ? 'bg-green-base' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-base focus:ring-offset-2`}
            >
              <span
                className={`${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          
          {/* Submit Button */}
          <div className="flex-shrink-0">
            <Button
              title="Submit a Request"
              icon={<ChevronRight />}
              styles="bg-green-base text-[#E6F3ED] justify-middle font-regular text-sm leading-relaxed w-full"
            />
          </div>
          <ThemeToggle />
        </div>
      </section>
    </>
  );
};

export default Header;