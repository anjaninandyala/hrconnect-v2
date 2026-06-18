import React from "react";

export const Select = ({ children }) => (
  <div>{children}</div>
);

export const SelectTrigger = ({
  children,
  className = "",
}) => (
  <select
    className={`border rounded-lg px-3 py-2 ${className}`}
  >
    {children}
  </select>
);

export const SelectContent = ({
  children,
}) => <>{children}</>;

export const SelectItem = ({
  children,
  value,
}) => (
  <option value={value}>
    {children}
  </option>
);

export const SelectValue = () => null;