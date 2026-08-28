import * as React from "react";

export interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  dark?: boolean;
}

export function ProcessStep({ number, title, description, dark = false }: ProcessStepProps) {
  return (
    <div className="group relative flex flex-col items-center p-6 text-center">
      <div className="relative mb-6">
        <div className="bg-accent text-accent-foreground border-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-16 w-16 items-center justify-center rounded-2xl border-2 font-mono text-2xl font-black shadow-md transition-all duration-300">
          {number}
        </div>
      </div>
      <h3
        className={`mb-2 text-xl font-bold tracking-tight ${dark ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h3>
      <p
        className={`max-w-xs text-sm leading-relaxed ${dark ? "text-gray-300" : "text-muted-foreground"}`}
      >
        {description}
      </p>
    </div>
  );
}
