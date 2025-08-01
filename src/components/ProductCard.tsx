import { ChevronRight, Globe, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
} from '../constants/images';
import { Link } from 'react-router-dom';
import { shortenString } from '../utils/theme';

// Animated Button component
interface ButtonProps {
  title: string;
  href: string;
  brandColors?: string[];
}

const Button: React.FC<ButtonProps> = ({ title, href, brandColors = [] }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getHoverStyle = () => {
    if (brandColors.length >= 2) {
      return `linear-gradient(to right, ${brandColors[0]}, ${brandColors[1]})`;
    } else if (brandColors.length === 1) {
      return brandColors[0];
    }
    return '';
  };

  const buttonStyle =
    isHovered && brandColors.length > 0 ? { background: getHoverStyle() } : {};

  return (
    <Link to={`${href}`}>
      <button
        className="bg-[#E6F3ED] dark:bg-[#20232D] text-[#2D986C] dark:text-[#868C98] font-regular px-6 hover:px-8 py-3 rounded-[17px] flex items-center gap-0 hover:gap-2 hover:shadow-lg transition-all duration-300 text-[14px] group overflow-hidden text-center whitespace-nowrap"
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className={`transition-transform duration-300 group-hover:-translate-x-1 ${
            isHovered ? 'text-white' : ''
          }`}
        >
          {title}
        </span>
        <span className="opacity-0 transform translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-2">
          <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ChevronRight size={20} />
          </div>
        </span>
      </button>
    </Link>
  );
};

// Badge component for categories
const Badge = ({ children, variant }) => {
  const variants = {
    Live: 'bg-[#A8E6CF] font-regular dark:bg-[#20232D] dark:text-white/70 text-black text-center',
    DeFi: 'bg-[#10B981] font-regular text-white text-center',
    DePIN: 'bg-[#06B6D4] font-regular text-white text-center',
    PayFi: 'bg-[#F59E0B] font-regular text-white text-center',
    RWAs: 'bg-[#DC2626] font-regular text-white text-center',
    InfoFi: 'bg-[#7C3AED] font-regular text-white text-center',
    Stablecoins: 'bg-[#374151] font-regular text-white text-center',
    Gaming: 'bg-[#0EA5E9] font-regular text-white text-center',
    AI: 'bg-[#9CA3AF] font-regular text-white text-center',
    Infrastructure: 'bg-[#8B5CF6] font-regular text-white text-center',
    Other: 'bg-[#9CA3AF] font-regular text-white text-center',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        variants[variant] || variants.Other
      }`}
    >
      {children}
    </span>
  );
};

// Avatar component
const Avatar = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full border-3 border-white ${className}`}
      style={{ width: 40, height: 40, minWidth: 40, minHeight: 40 }}
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
  brandColors: string[];
}

const ProductCard = ({
  name,
  categories,
  description,
  href,
  x,
  website,
  users,
  brandColors,
}: ProductCardProps) => {
  const avatars = [avatar1, avatar2, avatar3];

  // Limit the number of visible categories to prevent layout issues
  const maxVisibleCategories = 3;
  const visibleCategories = categories.slice(0, maxVisibleCategories);
  const remainingCount = categories.length - maxVisibleCategories;

  // For button hover effect, we want to push the avatars/users a little (not too much)
  // We'll use a state to track hover and apply a small translate-x on hover
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div className="rounded-2xl p-4 max-w-md mx-auto">
      {/* Header section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="font-bold text-3xl text-[#1E1E1E] dark:text-white mb-3 leading-8">
            {name}
          </h2>

          {/* Category badges - Updated to show multiple categories */}
          <div className="flex flex-wrap gap-2 mb-4 text-center">
            {visibleCategories.map((category, index) => (
              <Badge key={index} variant={category}>
                {category}
              </Badge>
            ))}
            {/* Show remaining count if there are more categories */}
            {remainingCount > 0 && (
              <Badge variant="Other">+{remainingCount} more</Badge>
            )}
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
        {shortenString(description, 125)}
      </p>

      {/* Bottom section */}
      <div className="p-1 flex justify-between items-center pt-2 gap-0">
        <div
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="flex items-center"
        >
          <Button
            title="Read More"
            href={`/product/${href}`}
            brandColors={brandColors}
          />
        </div>

        {/* Avatars and user count container */}
        <div
          className="flex items-center"
          style={{
            width: 178,
            height: 58,
            minWidth: 178,
            minHeight: 58,
            maxWidth: 178,
            maxHeight: 58,
            flexShrink: 0,
            flexGrow: 0,
            marginLeft: 4, // REDUCED gap between button and avatars/users
            transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
            transform: isButtonHovered ? 'translateX(12px)' : 'translateX(0)',
          }}
        >
          {/* Avatar stack and user count tightly grouped */}
          <div className="flex items-center" style={{ width: '100%' }}>
            <div className="flex items-center -space-x-2" style={{ flexShrink: 0 }}>
              {avatars.map((avatar, index) => (
                <Avatar
                  key={index}
                  src={avatar}
                  alt={`Team member ${index + 1}`}
                  className={
                    index === 0
                      ? 'bg-[#00F2FF]'
                      : index === 1
                      ? 'bg-[#C336F4]'
                      : index === 2
                      ? 'bg-[#19E6AD]'
                      : ''
                  }
                />
              ))}
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                width: 68,
                height: 24,
                minWidth: 68,
                minHeight: 24,
                maxWidth: 68,
                maxHeight: 24,
                marginLeft: 4,
                background: 'none',
              }}
            >
              <span
                className="font-extrabold text-[#1E1E1E] dark:text-white"
                style={{
                  fontSize: 16,
                  lineHeight: '24px',
                  whiteSpace: 'nowrap',
                  background: 'none',
                }}
              >
                {users}+
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
