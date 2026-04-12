"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Context
const DropdownContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

// Root
export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative" ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Trigger
export const DropdownMenuTrigger = ({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => {
  const { open, setOpen } = useContext(DropdownContext);

  if (asChild && typeof children === "object") {
    return (
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {children}
      </div>
    );
  }

  return <button onClick={() => setOpen(!open)}>{children}</button>;
};

// Content
export const DropdownMenuContent = ({
  children,
  className,
  align = "end",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end";
}) => {
  const { open } = useContext(DropdownContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute top-full mt-2 w-48 rounded-md border bg-popover text-popover-foreground shadow-md z-50",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

// Label
export const DropdownMenuLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>
    {children}
  </div>
);

// Separator
export const DropdownMenuSeparator = ({
  className,
}: {
  className?: string;
}) => <div className={cn("h-px bg-muted mx-1 my-1", className)} />;

// Item
export const DropdownMenuItem = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const { setOpen } = useContext(DropdownContext);

  return (
    <button
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
};

// Sub context
const DropdownSubContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

// Sub
export const DropdownMenuSub = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownSubContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownSubContext.Provider>
  );
};

// Sub Trigger
export const DropdownMenuSubTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open, setOpen } = useContext(DropdownSubContext);
  return (
    <button
      onClick={() => setOpen(!open)}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
        className,
      )}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </button>
  );
};

// Sub Content
export const DropdownMenuSubContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open } = useContext(DropdownSubContext);

  if (!open) return null;

  return <div className={cn("pl-4 pb-1", className)}>{children}</div>;
};
