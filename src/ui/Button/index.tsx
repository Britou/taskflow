import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
        "hover:-translate-y-0.5",
        "disabled:opacity-50 disabled:cursor-not-allowed",

        variant === "primary" &&
          "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md",

        variant === "secondary" &&
          "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",

        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-700",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
