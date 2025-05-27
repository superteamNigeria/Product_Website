import { ChevronRight, Globe, Twitter } from "lucide-react";
import React, { use } from "react";
import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "../constants/images";

// Animated Button component
const Button = ({ title, href }) => {
  return (
    <button className="bg-[#E6F3ED] text-[#2D986C] font-bold px-6 py-3 rounded-full flex items-center gap-0 hover:gap-3 hover:shadow-lg transition-all duration-300 text-[14px] group overflow-hidden text-center" onClick={() => window.location.href == href}>
      <span className="transition-transform duration-300 group-hover:-translate-x-1">
        {title}
      </span>
      <span className="opacity-0 transform translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
          <ChevronRight size={20} />
        </div>
      </span>
    </button>
  );
};

// Badge component for categories
const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-orange-500 text-white",
    secondary: "bg-gray-800 text-white",
    outline: "bg-transparent border border-gray-300 text-gray-700",
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
}

const ProductCard = ({
  name,
  categories,
  description,
  href,
  x,
  website,
  users
}: ProductCardProps) => {
    const avatars = [avatar1, avatar2, avatar3]
  return (
    <div className="rounded-2xl p-6 max-w-md mx-auto">
      {/* Header section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="font-bold text-2xl text-[#1E1E1E] mb-3">{name}</h2>

          {/* Category badges */}
          <div className="flex gap-2 mb-4">
            {categories?.map((category, index) => (
              <Badge
                key={index}
                variant={
                  index === 0
                    ? "default"
                    : index === 1
                    ? "secondary"
                    : "outline"
                }
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Social links */}
        <div className="flex gap-1 -space-x-2 ml-2">
          <a
            href={x}
            className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={20} />
          </a>
          <a
            href={website}
            className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe size={20} />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-regular text-[#1E1E1E80] leading-[100%] text-[16px] mb-3 text-pretty">
        {description}
      </p>

      {/* Bottom section */}
      <div className="flex justify-between items-center pt-2">
        <Button title="Read More"  />

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
           <h2 className="font-extrabold text-[#1E1E1E]">{users}+</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCard