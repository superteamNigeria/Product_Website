import React from "react";
import { useState, useEffect } from "react";
import { filterColors } from "../constants/menu";
import { Search } from "lucide-react";

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
    <section className="flex-1 gap-4 justify-center items-center text-center">
      <h2 className="font-semibold text-black text-[40px] text-b md:text-[40px] ">
        Looking for a Project to  {''}
        <span 
          className={`text-green-base underline transition-all duration-300 ease-out inline-block ${
            isActionVisible ? 'opacity-100 transform translate-y-0 italic' : 'opacity-0 transform -translate-y-4 italic'
          }`}
        >
          {actions[currentActionIndex]}
        </span>
        ?
      </h2>
      <p className="text-pretty font-regular leading-[100%]">
        Each product in our ecosystem is assigned a distinctive tag that
        succinctly captures its core functionality and category, enabling users
        to quickly understand its role and value.
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
                className={`font-medium whitespace-nowrap transition-all duration-300 ease-out ${
                  isExpanded ? "text-sm" : "text-xs"
                } ${
                  item.hex === "#374151" ||
                  item.hex === "#7C3AED"
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

           {/* Search Input */}
           <div className="flex items-center bg-[#E2E4E9] px-3 py-2.5 rounded-[17px] min-w-[150px]">
            <Search color="#02834E" width={20} height={20} className="flex-shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none text-neutral-400 font-semibold ml-3 w-full text-sm"
            />
          </div>
    </section>
  );
};

export default Hero;