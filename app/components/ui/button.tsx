"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
          variant === "default" && "bg-[#C8A97E] hover:bg-[#B89A6F] text-black",
          variant === "outline" && "border border-[#C8A97E]/20 hover:bg-[#C8A97E]/10 text-white",
          className
        )}
        {...props}
      />
    )
  }
) 