import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        "transition-all duration-200",
        "sm:hover:-translate-y-1",
        "sm:hover:shadow-lg", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}