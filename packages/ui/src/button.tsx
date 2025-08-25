"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant?:
    | "default"
    | "primary"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "hero"
    | "destructive";
  className?: string;
  size?: "default" | "lg" | "sm" | "icon";
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
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    primary:
      "bg-blue-600 text-black border-2 border-blue-600 shadow hover:bg-blue-700 hover:border-blue-700 focus-visible:ring-blue-500",
    outline:
      "border border-input bg-foreground p-2 rounded-sm  hover:bg-accent hover:text-accent-background",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground bg-gray-900",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    link: "text-primary underline-offset-4 hover:underline",
    hero: "bg-gradient-hero text-primary-foreground hover:shadow-glow hover:scale-105 transition-all duration-300"
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
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
