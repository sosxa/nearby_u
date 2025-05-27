"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Your utility function

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    onValueChange: (value: string) => void;
  }
>(({ className, value, onValueChange, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("inline-flex h-10 items-center justify-center p-1", className)}
    onClick={() => {
      console.log("hello world")
      console.log("Theme " + useTheme())
      console.log("Theme " + useTheme)
    }}
    {...props}
  />
));

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md bg-muted p-1",
      className
    )}
    {...props}
  />
));

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    icon?: React.ReactNode;
  }
>(({ className, value, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      "hover:bg-accent hover:text-accent-foreground",
      className
    )}
    data-state={value === props["aria-selected"] ? "active" : "inactive"}
    {...props}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </button>
));

export { Tabs, TabsList, TabsTrigger };