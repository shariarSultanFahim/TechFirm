import React from "react";

export function CheckBadgeIcon({ className = "size-4 text-[#864FFE]" }: { className?: string }) {
  return (
    <span className="flex size-5.5 items-center justify-center rounded-full bg-white text-[#864FFE] shadow-xs">
      <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.3334 4L6.00008 11.3333L2.66675 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
