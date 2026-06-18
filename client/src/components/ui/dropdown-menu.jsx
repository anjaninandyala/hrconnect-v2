import React from "react";

export const DropdownMenu = ({
  children,
}) => (
  <div>{children}</div>
);

export const DropdownMenuTrigger =
  ({
    children,
  }) => <>{children}</>;

export const DropdownMenuContent =
  ({
    children,
  }) => (
    <div className="
      absolute
      bg-white
      border
      rounded-lg
      shadow-lg
      p-2
      z-50
    ">
      {children}
    </div>
  );

export const DropdownMenuItem =
  ({
    children,
    onClick,
    className = "",
  }) => (
    <div
      onClick={onClick}
      className={`
        px-3
        py-2
        cursor-pointer
        hover:bg-slate-100
        ${className}
      `}
    >
      {children}
    </div>
  );

export const DropdownMenuSeparator =
  () => (
    <hr className="my-2" />
  );