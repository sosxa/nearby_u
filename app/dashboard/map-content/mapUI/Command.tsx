"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SearchIcon, X, Loader2 } from "lucide-react";
import { forwardRef } from "react";


interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    displayValue?: string;
    onClear?: () => void;
    isSearching?: boolean;
    wrapperClassName?: string;
}

const Command = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col rounded-lg border bg-popover text-popover-foreground shadow-md overflow-hidden",
            className
        )}
        {...props}
    />
));
Command.displayName = "Command";


interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange?: (value: string) => void;
    wrapperClassName?: string;
}

const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
    ({ className, wrapperClassName, onValueChange, ...props }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange?.(e);
            onValueChange?.(e.target.value);
        };

        return (
            <div className={cn("flex items-center border-b px-3", wrapperClassName)}>
                <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <input
                    ref={ref}
                    className={cn(
                        "flex h-10 w-full bg-transparent py-2 text-sm outline-none",
                        "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    onChange={handleChange}
                    {...props}
                />
            </div>
        );
    }
);

CommandInput.displayName = "CommandInput";


const CommandList = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("overflow-y-auto overflow-x-hidden", className)}
        {...props}
    />
));
CommandList.displayName = "CommandList";

const CommandEmpty = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("py-6 text-center text-sm text-muted-foreground", className)}
        {...props}
    />
));
CommandEmpty.displayName = "CommandEmpty";

const CommandGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
            "[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
            className
        )}
        {...props}
    />
));
CommandGroup.displayName = "CommandGroup";


// interface CommandItemProps<T = string> extends React.HTMLAttributes<HTMLLIElement> {
//     onSelect?: (value: T) => void;
//     value?: T;
//     selected?: boolean;
// }

interface CommandItemProps<T = unknown> {
    /**
     * Optional value to pass to onSelect handler
     */
    value?: T;
    /**
     * Callback when item is selected
     */
    onSelect?: (value: T) => void;
    /**
     * Whether the item is currently selected
     */
    selected?: boolean;
    /**
     * Standard React li element props
     */
    liProps?: React.LiHTMLAttributes<HTMLLIElement>;
    /**
     * Additional class names
     */
    className?: string;
    /**
     * Item content
     */
    children?: React.ReactNode;
  }

const CommandItem = forwardRef<HTMLLIElement, CommandItemProps>(
    ({ className, onSelect, value = "", selected, ...props }, ref) => {
        return (
            <li
                ref={ref}
                className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    selected && "bg-accent text-accent-foreground",
                    className
                )}
                onClick={() => onSelect?.(value)}
                {...props}
            />
        );
    }
);

CommandItem.displayName = "CommandItem";


export {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
};