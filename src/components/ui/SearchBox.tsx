import { Search, SlidersHorizontal } from "lucide-react";
import { filterColors } from "../../constants/menu";
import React from "react";

const SearchBox = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isColorPaletteVisible, setIsColorPaletteVisible] = React.useState(false);
  const [hoveredColor, setHoveredColor] = React.useState<number | null>(null);

  const handleColorPaletteToggle = () => {
    setIsColorPaletteVisible(!isColorPaletteVisible);
  };
    
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-3xl p-3 gap-2 ">
      <div className="flex items-center w-full gap-2">
        <div className="flex items-center w-full bg-[#E2E4E9] dark:bg-[#20232D] px-3 py-2.5 rounded-full">
          <Search
            color={searchQuery ? "#227D39" : "#868C98"}
            width={20}
            height={20}
            className="flex-shrink-0"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="bg-transparent border-none outline-none text-neutral-600 dark:bg-[#20232D] dark:text-white font-medium ml-3 w-full text-sm"
          />
        </div>

        <div
          className="text-gray-600 bg-[#E2E4E9] p-3 rounded-full cursor-pointer hover:bg-[#D1D5DB] transition-colors"
          onClick={handleColorPaletteToggle}
        >
          <SlidersHorizontal
            color={isColorPaletteVisible ? "#227D39" : "#868C98"}
            width={20}
            height={20}
            className="flex-shrink-0"
          />
        </div>
      </div>

      {/* Show selected filter pill if a filter is selected */}
      {selectedCategory && (
        <div className="flex items-center gap-2 mt-2">
          <span className="px-3 py-1 rounded-full bg-[#02834E] text-white text-xs font-medium flex items-center">
            {selectedCategory}
            <button
              className="ml-2 text-white bg-transparent hover:text-gray-200 focus:outline-none"
              onClick={() => setSelectedCategory("")}
              aria-label="Clear filter"
            >
              &times;
            </button>
          </span>
        </div>
      )}

      {/* Only show color palette if no filter is selected */}
      {isColorPaletteVisible && !selectedCategory && (
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
                setSelectedCategory(color.name);
                setIsColorPaletteVisible(false);
              }}
            >
              {hoveredColor === index ? (
                <>
                  <span className={`text-black text-xs font-medium whitespace-nowrap `}>
                    {color.name}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-black/70 dark:bg-white/70"></div>
                </>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-black/70 dark:bg-white/70"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
