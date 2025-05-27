import React, { useState } from 'react';

export default function ExpandableNavigationBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const navigationItems = [
    { hex: '#A8E6CF', name: 'Live on Mainnet' },
    { hex: '#06B6D4', name: 'DePIN' },
    { hex: '#10B981', name: 'DeFi' },
    { hex: '#F59E0B', name: 'PayFi' },
    { hex: '#DC2626', name: 'RWAs' },
    { hex: '#7C3AED', name: 'InfoFi' },
    { hex: '#374151', name: 'Stablecoins' },
    { hex: '#0EA5E9', name: 'Gaming' },
    { hex: '#9CA3AF', name: 'AI' }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div 
        className="relative bg-white rounded-full shadow-lg transition-all duration-300 ease-out overflow-hidden"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className={`flex items-center transition-all duration-300 ease-out ${
          isExpanded ? 'px-4 py-2 gap-4' : 'px-4 py-3 gap-3 -space-x-10'
        }`}>
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className={`cursor-pointer relative flex items-center justify-center transition-all duration-300 ease-out ${
                isExpanded 
                  ? 'rounded-full px-4 py-2 gap-4' 
                  : 'rounded-full px-3 py-2 gap-2'
              }`}
              style={{ backgroundColor: item.hex }}
              onClick={() => {
                console.log(`Selected: ${item.name}`);
              }}
            >
              <div className={`rounded-full transition-all duration-300 ease-out ${
                isExpanded ? 'w-3 h-3' : 'w-2 h-2'
              }`} 
              style={{ backgroundColor: item.hex === '#A8E6CF' || item.hex === '#F59E0B' ? '#000' : '#fff' }}
              />
              
              <span className={`font-medium whitespace-nowrap transition-all duration-300 ease-out ${
                isExpanded ? 'text-sm' : 'text-xs'
              } ${
                item.isSpecial || item.hex === '#374151' || item.hex === '#7C3AED' 
                  ? 'text-white' 
                  : item.hex === '#A8E6CF' || item.hex === '#F59E0B' || item.hex === '#0EA5E9' || item.hex === '#06B6D4' || item.hex === '#A8E6CF'
                    ? 'text-black'
                    : 'text-white'
              }`}>
                {item.name}
              </span>
              
                <div className={`rounded-full bg-white/70 transition-all duration-300 ease-out ${
                  isExpanded ? 'w-2 h-2' : 'w-1.5 h-1.5 rounded-full bg-white/70'
                }`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}