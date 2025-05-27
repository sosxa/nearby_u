"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ 
    className, 
    orientation = "horizontal", 
    decorative = true,
    ...props 
  }, ref) => {
    const styles = cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    );

    if (decorative) {
      return (
        <hr 
          ref={ref}
          className={styles}
          role="presentation"
          {...props}
        />
      );
    }

    return (
      <hr 
        ref={ref}
        className={styles}
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };