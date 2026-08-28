import * as React from "react";

export interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  dark?: boolean;
}

export function ProcessStep({ number, title, description, dark = false }: ProcessStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center p-6 group">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center text-2xl font-black font-mono border-2 border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-md">
          {number}
        </div>
      </div>
      <h3 className={`text-xl font-bold mb-2 tracking-tight ${dark ? "text-white" : "text-foreground"}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed max-w-xs ${dark ? "text-gray-300" : "text-muted-foreground"}`}>
        {description}
      </p>
    </div>
  );
}
