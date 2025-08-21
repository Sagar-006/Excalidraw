"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant: 'primary' | 'outline' | 'secondary';
  className?: string;
  size: 'lg' | 'sm';
  onClick?: () => void;
  children:ReactNode;
}

export const Button = ({
  size,
  variant,
  className,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${className} ${
        variant === "primary"
          ? "bg-blue-600 border-2"
          : variant === "outline"
            ? "bg-transparent border-2 border-blue-600"
            : "bg-gray-900 border-2"
      } ${size === "lg" ? "px-4 py-2" : "px-2 py-1"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
