
import type { ReactNode } from "react";
import { clsx } from "clsx";

interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  size?: "sm" | "md";
  children: ReactNode;
}

function Badge({
  variant = "neutral",
  size = "md",
  children,
}: BadgeProps) {
  const variants = {
    success:
      "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
    error:
      "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
    info:
      "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    neutral:
      "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size]
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
