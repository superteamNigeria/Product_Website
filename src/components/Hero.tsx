import React from "react";
import { useState, useEffect } from "react";
import { filterColors } from "../constants/menu";
import { Search } from "lucide-react";
import SearchBox from "./ui/SearchBox";

const Hero = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [isActionVisible, setIsActionVisible] = useState(true);
  
  const actions = ['Shill', 'Invest', 'Partner', 'Join'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActionVisible(false);
      
      setTimeout(() => {
        setCurrentActionIndex((prevIndex) => (prevIndex + 1) % actions.length);
        setIsActionVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col items-center text-center px-4 py-6 md:px-6 lg:px-8 max-w-5xl mx-auto">
      <h2 className="font-regular leading-4 text-black dark:text-white text-lg sm:text-3xl md:text-3xl mb-4">
        Looking for a Project to{" "}
        <span
          className={`text-green-base underline transition-all duration-300 ease-out inline-block ${
            isActionVisible
              ? "opacity-100 translate-y-0 italic"
              : "opacity-0 -translate-y-4 italic"
          }`}
        >
          {actions[currentActionIndex]}
        </span>
        <span className="italic font-regular">?</span>
      </h2>

      <p className="text-black dark:text-white text-center font-regular text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-6">
      Each product is assigned a distinctive tag that captures its core functionality and category
      </p>

      <div
        className="relative transition-all duration-300 ease-out overflow-hidden justify-center items-center mx-auto max-w-7xl hidden md:block"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div
          className={`flex items-center transition-all duration-300 ease-out ${
            isExpanded ? "px-2 py-2 gap-2" : "px-2 py-3 gap-2 -space-x-10"
          } flex-nowrap justify-center`}
        >
          {filterColors.map((item, index) => (
            <div
              key={index}
              className={`cursor-pointer relative flex items-center justify-center transition-all duration-300 ease-out ${
                isExpanded
                  ? "rounded-full px-2 py-2 gap-2"
                  : "rounded-full px-3 py-2 gap-2"
              }`}
              style={{ backgroundColor: item.hex }}
              onClick={() => {
                console.log(`Selected: ${item.name}`);
              }}
            >
              <span
                className={`font-regular leading-relaxed whitespace-nowrap transition-all duration-300 ease-out ${
                  isExpanded ? "text-sm" : "text-xs"
                } ${
                  item.hex === "#374151" || item.hex === "#7C3AED"
                    ? "text-white"
                    : item.hex === "#A8E6CF" ||
                      item.hex === "#F59E0B" ||
                      item.hex === "#0EA5E9" ||
                      item.hex === "#06B6D4" ||
                      item.hex === "#A8E6CF"
                    ? "text-black"
                    : "text-white"
                }`}
              >
                {item.name}
              </span>

              <div
                className={`rounded-full bg-white/70 transition-all duration-300 ease-out ${
                  isExpanded
                    ? "w-2 h-2"
                    : "w-1.5 h-1.5 rounded-full bg-white/70"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <SearchBox />
      
    </section>
  );
};

export default Hero;