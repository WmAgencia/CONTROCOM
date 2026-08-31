"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "success";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium",
        variant === "default" &&
          "border border-blue-500/30 bg-blue-500/10 text-blue-400 backdrop-blur-xl",
        variant === "outline" && "border border-white/10 bg-white/[0.03] text-white/70",
        variant === "success" && "border border-green-500/30 bg-green-500/10 text-green-400",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
