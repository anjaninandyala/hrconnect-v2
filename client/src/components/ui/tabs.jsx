import React from "react";

export const Tabs = ({
  children,
}) => (
  <div>{children}</div>
);

export const TabsList = ({
  children,
  className = "",
}) => (
  <div
    className={`flex gap-2 ${className}`}
  >
    {children}
  </div>
);

export const TabsTrigger = ({
  children,
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 border rounded-lg ${className}`}
  >
    {children}
  </button>
);

export const TabsContent = ({
  children,
}) => (
  <div>{children}</div>
);