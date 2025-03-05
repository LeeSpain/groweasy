
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:brightness-105 shadow-button border-none",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-none",
      outline:
        "bg-transparent border border-input hover:bg-secondary text-foreground",
      ghost: "bg-transparent hover:bg-secondary text-foreground border-none",
      link: "bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto border-none",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
      icon: "h-10 w-10 p-0",
    };

    const loadingClass = isLoading
      ? "opacity-70 pointer-events-none relative"
      : "";
    const fullWidthClass = fullWidth ? "w-full" : "";

    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-apple focus-ring select-none",
          variants[variant],
          sizes[size],
          loadingClass,
          fullWidthClass,
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span className={isLoading ? "opacity-0" : ""}>
          {icon && iconPosition === "left" && !isLoading && (
            <span className="mr-2 -ml-1">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && !isLoading && (
            <span className="ml-2 -mr-1">{icon}</span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
