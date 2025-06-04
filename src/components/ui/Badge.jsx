import React from "react";

const Badge = ({ children, variant }) => {
  const variants = {
    Live: "bg-[#A8E6CF] font-regular dark:bg-[#20232D] dark:text-white/70 text-black text-center",
    DeFi: "bg-[#10B981] font-regular text-white text-center",
    DePIN: "bg-[#06B6D4] font-regular text-white text-center",
    PayFi: "bg-[#F59E0B] font-regular text-white text-center",
    RWAs: "bg-[#DC2626] font-regular text-white text-center",
    InfoFi: "bg-[#7C3AED] font-regular text-white text-center",
    Stablecoins: "bg-[#374151] font-regular text-white text-center",
    Gaming: "bg-[#0EA5E9] font-regular text-white text-center",
    AI: "bg-[#9CA3AF] font-regular text-white text-center",
    Other: "bg-[#9CA3AF] font-regular text-white text-center",
  };

  const appliedVariant = variants[variant] || variants["Other"];

  return (
    <span
      className={`px-6 py-1 rounded-full text-sm font-medium ${appliedVariant}`}
    >
      {children || "Badge"}
    </span>
  );
};

export default Badge;
