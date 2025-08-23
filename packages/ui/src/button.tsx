"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "outline" | "secondary";
  className?: string;
  size?: "lg" | "sm";
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  size = "lg",
  variant = "primary",
  className = "",
  children,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center font-semibold transition transform disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    primary:
      "bg-blue-600 text-black border-2 border-blue-600 shadow hover:bg-blue-700 hover:border-blue-700 focus-visible:ring-blue-500",
    outline:
      "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500",
    secondary:
      "bg-gray-900 text-white border-2 border-gray-900 hover:bg-gray-800 focus-visible:ring-gray-700",
  };
  const sizes = {
    lg: "px-6 py-3 text-base rounded-lg",
    sm: "px-3 py-1.5 text-sm rounded",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
