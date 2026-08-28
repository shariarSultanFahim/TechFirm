import React from "react";

export function UShapeBadgeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4v10a6 6 0 0 0 12 0V4" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}
