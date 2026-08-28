import * as React from "react";

export interface StatCounterProps {
  value: string;
  label: string;
  description?: string;
  dark?: boolean;
}

export function StatCounter({ value, label, description, dark = false }: StatCounterProps) {
  return (
    <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-105 duration-300 ${
      dark 
        ? "bg-dark-card border-dark-border text-white" 
        : "bg-card border-border text-foreground shadow-sm"
    }`}>
      <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 font-mono">{value}</div>
      <div className={`text-base font-bold mb-1 ${dark ? "text-white" : "text-foreground"}`}>{label}</div>
      {description && (
        <div className={`text-xs ${dark ? "text-gray-400" : "text-muted-foreground"}`}>{description}</div>
      )}
    </div>
  );
}
