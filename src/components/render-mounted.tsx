"use client";

import React, { ReactNode, useEffect, useState } from "react";

// To avoid hydration errors
export const RenderMounted = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      suppressHydrationWarning
      style={{ visibility: mounted ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
};
