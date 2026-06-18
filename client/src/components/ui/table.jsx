import React from "react";

export const Table = ({
  children,
  className = "",
}) => (
  <table
    className={`w-full ${className}`}
  >
    {children}
  </table>
);

export const TableHeader = ({
  children,
  className = "",
}) => (
  <thead className={className}>
    {children}
  </thead>
);

export const TableBody = ({
  children,
  className = "",
}) => (
  <tbody className={className}>
    {children}
  </tbody>
);

export const TableRow = ({
  children,
  className = "",
  ...props
}) => (
  <tr
    className={className}
    {...props}
  >
    {children}
  </tr>
);

export const TableHead = ({
  children,
  className = "",
}) => (
  <th
    className={`p-3 text-left ${className}`}
  >
    {children}
  </th>
);

export const TableCell = ({
  children,
  className = "",
}) => (
  <td
    className={`p-3 ${className}`}
  >
    {children}
  </td>
);