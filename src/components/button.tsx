"use client";

import React from "react";

export interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {text}
    </button>
  );
};
