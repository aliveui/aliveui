"use client";

import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface AppleButtonProps extends ButtonProps {
  isLoading?: boolean;
  appleStyle?: "macOS" | "iOS" | "iPadOS";
  haptic?: boolean;
}

const AppleButton = React.forwardRef<HTMLButtonElement, AppleButtonProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "default",
      isLoading = false,
      appleStyle = "macOS",
      haptic = true,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (haptic && !disabled && window.navigator.vibrate) {
        window.navigator.vibrate(10); // Subtle haptic feedback
      }

      if (onClick) {
        onClick(e);
      }
    };

    // Determine correct border radius based on Apple style
    const borderRadiusClass =
      appleStyle === "iOS" || appleStyle === "iPadOS"
        ? "rounded-lg"
        : "rounded-md";

    return (
      <Button
        className={cn(
          // Base apple-like styling
          "relative font-medium overflow-hidden transition-all duration-200 ease-out",
          // Apply correct border-radius for different Apple styles
          borderRadiusClass,
          // Default variant
          variant === "default" && [
            "bg-gradient-to-b from-[#0A84FF]/95 to-[#0A84FF] text-white shadow-sm",
            appleStyle === "macOS" && "border border-[#0A84FF]/20",
            !disabled && "hover:from-[#0A84FF]/90 hover:to-[#0075E6]",
          ],
          // Secondary variant
          variant === "secondary" && [
            appleStyle === "macOS"
              ? "bg-gradient-to-b from-[#F5F5F7] to-[#E1E1E5] text-[#0A84FF] border border-[#D1D1D6]"
              : "bg-[#F5F5F7] text-[#0A84FF] border border-[#D1D1D6]",
          ],
          // Destructive variant
          variant === "destructive" && [
            "bg-gradient-to-b from-[#FF453A]/95 to-[#FF453A] text-white",
            appleStyle === "macOS" && "border border-[#FF453A]/20",
            !disabled && "hover:from-[#FF453A]/90 hover:to-[#E43A30]",
          ],
          // Ghost variant
          variant === "ghost" && [
            "bg-transparent text-[#0A84FF]",
            !disabled && "hover:bg-[#F5F5F7]/60",
          ],
          // Outline variant
          variant === "outline" && [
            "bg-transparent border border-[#8E8E93] text-[#8E8E93]",
            !disabled && "hover:bg-[#F5F5F7]/60 hover:border-[#636366]",
          ],
          // Link variant
          variant === "link" && [
            "bg-transparent underline-offset-4 text-[#0A84FF] hover:bg-transparent",
            !disabled && "hover:underline",
          ],
          // Size variants that match Apple's specs more closely
          size === "default" && "h-10 px-5 py-2",
          size === "sm" && "h-8 px-4 py-1 text-sm",
          size === "lg" && "h-12 px-8 py-3 text-lg",
          // Apply Apple-specific interaction effects
          !disabled &&
            !isLoading && [
              // Subtle shine/reflection effect on top
              "before:absolute before:inset-x-0 before:top-0 before:h-[45%] before:bg-gradient-to-b before:from-white/10 before:to-transparent",
              // Improved press effects with subtle shadow changes
              "active:scale-[0.98] active:shadow-inner active:brightness-90",
              isPressed && "scale-[0.98] shadow-inner brightness-90",
              "hover:brightness-[1.03]",
            ],
          // Improved focus styling
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]/50 focus-visible:ring-offset-1",
          // Disabled state styling
          disabled && "opacity-50 cursor-not-allowed",
          // Better gradient animation
          "transition-[transform,box-shadow,background,opacity] will-change-transform",
          // Pass along any custom classes
          className
        )}
        variant={variant}
        size={size}
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {children}
            {/* Apply subtle highlight for pressed state */}
            <span
              className={cn(
                "absolute inset-0 opacity-0 bg-gradient-to-t from-black/5 to-transparent transition-opacity",
                isPressed && "opacity-100"
              )}
            />
          </>
        )}
      </Button>
    );
  }
);
AppleButton.displayName = "AppleButton";

export { AppleButton };
