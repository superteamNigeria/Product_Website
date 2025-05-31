import { ChevronRight, Globe, Twitter } from "lucide-react";
import React, { use } from "react";
import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "../constants/images";

// Animated Button component
interface ButtonProps {
  title: string;
  href: string;
  colors?: string[];
}

const Button: React.FC<ButtonProps> = ({ title, href, colors = [] }) => {
  const getHoverStyle = () => {
    if (colors.length === 2) {
      return `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
    } else if (colors.length === 1) {
      return colors[0];
    }
    return '';
  };

  const getSingleBackground = () => {
    if(colors.length === 1){
      return `bg-${colors[0]}`
    }
  }

  return (
    <button 
      className="bg-[#E6F3ED] dark:bg-[#20232D]  text-[#2D986C] dark:text-[#868C98] font-regular px-6 hover:px-8 py-3 rounded-[17px] flex items-center gap-0 hover:gap-2 hover:shadow-lg transition-all duration-300 text-[14px] group overflow-hidden text-center whitespace-nowrap "
      onClick={() => window.location.href = href}
      style={{
        background: colors.length === 2 ? getHoverStyle() : undefined,
        backgroundColor: colors.length === 1 ? colors[0] : undefined,
      }}
    >
      <span className="transition-transform duration-300 group-hover:-translate-x-1">
        {title}
      </span>
      <span className="opacity-0 transform translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-2">
        <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
          <ChevronRight size={20} />
        </div>
      </span>
    </button>
  );
};

// Badge component for categories
const Badge = ({ children, variant }) => {
  const variants = {
    Live: "bg-[#E6F3ED] font-regular dark:bg-[#20232D] dark:text-white/70 text-black text-center",
    DeFi: "bg-[#10B981] font-regular text-white text-center",
    DePIN: "bg-[#06B6D4] font-regular text-white text-center",
    PayFi: "bg-[#22C55E] font-regular text-white text-center",
    RWAs: "bg-[#374151] font-regular text-white text-center",
    InfoFi: "bg-[#0EA5E9] font-regular text-white text-center",
    Stablecoins: "bg-[#F59E0B] font-regular text-white text-center",
    Gaming: "bg-[#EA580C] font-regular text-white text-center",
    AI: "bg-[#DC2626] font-regular text-white text-center",
    Other: "bg-[#9CA3AF] font-regular text-white text-center",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

// Avatar component
const Avatar = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-10 h-10 rounded-full shadow-sm"
    />
  );
};

interface ProductCardProps {
  name: string;
  categories: string[];
  description: string;
  href: string;
  x: string;
  website: string;
  users: string;
  colors: string[];
}

const ProductCard = ({
  name,
  categories,
  description,
  href,
  x,
  website,
  users,
  colors
}: ProductCardProps) => {
    const avatars = [avatar1, avatar2, avatar3]
  return (
    <div className="rounded-2xl p-6 max-w-md mx-auto">
      {/* Header section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="font-bold text-2xl text-[#1E1E1E] dark:text-white mb-3 leading-8">{name}</h2>

          {/* Category badges */}
          <div className="flex gap-2 mb-4 text-center">
            {categories?.map((category, index) => (
              <Badge
                key={index}
                variant={
                  category
                }
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Social links */}
        <div className="flex gap-1 -space-x-4 ml-2">
          <a
            href={x}
            className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-green-base transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={20} />
          </a>
          <a
            href={website}
            className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-green-base transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe size={20} />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="font-regular text-[#1E1E1E80] dark:text-[#FFFFFF80] leading-relaxed text-[13px] mb-3 text-pretty">
        {description}
      </p>

      {/* Bottom section */}
      <div className="p-1 flex justify-between items-center pt-2 gap-2">
        <Button title="Read More" href={href} colors={colors}  />

        {/* Avatar stack */}
        {avatars && avatars.length > 0 && (
          <div className="flex -space-x-4">
            {avatars.map((avatar, index) => (
              <Avatar
                key={index}
                src={avatar}
                alt={`Team member ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="flex -space-x-4">
           <h2 className="font-extrabold text-[#1E1E1E] dark:text-white text-lg">{users}+</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCard