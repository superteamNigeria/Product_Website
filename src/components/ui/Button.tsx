import React from 'react'

interface ButtonProps {
    title: string;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    color?: string;
    styles?: string;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}
const Button = ({title, variant, size, color, icon, styles, onClick}: ButtonProps) => {
  return (
    <button className={`${styles} ${variant} ${size} ${color} rounded-[17px] w-[140px] h-[40px] flex items-center justify-center px-4 py-2 font-semibold`} onClick={onClick}>
        {title}
        {icon}
    </button>
  )
}

export default Button