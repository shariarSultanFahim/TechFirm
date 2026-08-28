import React from "react";

export function ArrowBadgeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 13h8V3L21 21l-8-3v-5H3z" />
    </svg>
  );
}
