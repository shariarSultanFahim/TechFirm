import * as React from "react";

export interface StatCounterProps {
  value: string;
  label: string;
  description?: string;
  dark?: boolean;
}

export function StatCounter({ value, label, description, dark = false }: StatCounterProps) {
  return (
    <div
      className={`rounded-2xl border p-6 text-center transition-all duration-300 hover:scale-105 ${
        dark
          ? "bg-dark-card border-dark-border text-white"
          : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <div className="text-primary mb-2 font-mono text-4xl font-extrabold md:text-5xl">{value}</div>
      <div className={`mb-1 text-base font-bold ${dark ? "text-white" : "text-foreground"}`}>
        {label}
      </div>
      {description && (
        <div className={`text-xs ${dark ? "text-gray-400" : "text-muted-foreground"}`}>
          {description}
        </div>
      )}
    </div>
  );
}
