import * as React from "react";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  links?: React.ReactNode;
  bottom?: React.ReactNode;
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className = "", brand, links, bottom, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={`ui-footer bg-background text-foreground w-full border-t ${className}`}
        {...props}
      >
        <div className="container mx-auto space-y-8 px-4 py-12 sm:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Brand / Description column */}
            {brand && <div className="space-y-4 md:col-span-4">{brand}</div>}

            {/* Links columns */}
            {links && (
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">{links}</div>
            )}
          </div>

          {children}

          {/* Bottom Bar / Copyright */}
          {bottom && (
            <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm sm:flex-row">
              {bottom}
            </div>
          )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";
