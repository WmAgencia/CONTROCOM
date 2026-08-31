"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gradient";
  className?: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  className,
  onClick,
  href,
  icon,
  size = "md",
}: ButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const baseClass = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.97]",
    sizes[size],
    variant === "primary" && "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10",
    variant === "secondary" &&
      "border border-white/10 bg-white/[0.03] backdrop-blur-xl text-white hover:border-white/20 hover:bg-white/[0.06]",
    variant === "gradient" &&
      "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40",
    className
  );

  const content = (
    <>
      {variant === "gradient" && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
          aria-hidden
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClass}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={baseClass}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
