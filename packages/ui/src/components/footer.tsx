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
        className={`ui-footer w-full border-t bg-background text-foreground ${className}`}
        {...props}
      >
        <div className="container mx-auto px-4 py-12 sm:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand / Description column */}
            {brand && <div className="md:col-span-4 space-y-4">{brand}</div>}

            {/* Links columns */}
            {links && <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">{links}</div>}
          </div>

          {children}

          {/* Bottom Bar / Copyright */}
          {bottom && (
            <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              {bottom}
            </div>
          )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";
