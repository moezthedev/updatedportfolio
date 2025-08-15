// components/Spinner.tsx
import React from "react";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerColor = "blue" | "green" | "red" | "indigo";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

export default function Spinner({ size = "md", color = "blue" }: SpinnerProps) {
  const sizes: Record<SpinnerSize, string> = {
    sm: "w-8 h-8 border-2",
    md: "w-16 h-16 border-4",
    lg: "w-24 h-24 border-4",
  };

  const colors: Record<SpinnerColor, string> = {
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
    indigo: "border-indigo-500",
  };

  return (
    <div
      className={`${sizes[size]} ${colors[color]} border-t-transparent rounded-full animate-spin`}
    ></div>
  );
}
