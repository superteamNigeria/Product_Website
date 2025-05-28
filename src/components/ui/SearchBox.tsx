import { Search, SlidersHorizontal } from "lucide-react";
import { filterColors } from "../../constants/menu";
import { useState } from "react";

const SearchBox = () => {
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);

  const handleColorPaletteToggle = () => {
    setIsColorPaletteVisible(!isColorPaletteVisible);
    };
    
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-3xl p-3 gap-2 ">
      <div className="flex items-center w-full gap-2">
        <div className="flex items-center w-full bg-[#E2E4E9] dark:bg-[#20232D] px-3 py-2.5 rounded-full">
          <Search
            color="#02834E"
            width={20}
            height={20}
            className="flex-shrink-0 dark:hidden"
          />
          <Search
            color="#868C98"
            width={20}
            height={20}
            className="flex-shrink-0 hidden dark:block"
          />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-neutral-600 dark:bg-[#20232D] font-medium ml-3 w-full text-sm"
          />
        </div>

        <div
          className="text-gray-600 bg-[#E2E4E9] p-3 rounded-full cursor-pointer hover:bg-[#D1D5DB] transition-colors md:hidden"
          onClick={handleColorPaletteToggle}
        >
          <SlidersHorizontal
            color="#02834E"
            width={20}
            height={20}
            className="flex-shrink-0"
          />
        </div>
      </div>

      {isColorPaletteVisible && (
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
      )}
    </div>
  );
};

export default SearchBox;
