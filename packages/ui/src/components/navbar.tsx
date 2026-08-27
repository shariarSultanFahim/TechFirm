import * as React from "react";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: React.ReactNode;
  actions?: React.ReactNode;
  mobileMenu?: (props: { isOpen: boolean; close: () => void }) => React.ReactNode;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className = "", logo, links, actions, mobileMenu, children, ...props }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
      <header
        ref={ref}
        className={`ui-navbar sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur ${className}`}
        {...props}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          {/* Logo Slot */}
          <div className="ui-navbar-logo flex items-center gap-2">{logo}</div>

          {/* Desktop Nav Links */}
          <nav className="ui-navbar-links hidden md:flex items-center gap-6 text-sm font-medium">
            {links}
          </nav>

          {/* Action / CTA Slot & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="ui-navbar-actions hidden sm:flex items-center gap-2">{actions}</div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              className="ui-navbar-toggle md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-muted text-foreground"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Slot */}
        {isMenuOpen && (
          <div className="ui-navbar-mobile md:hidden border-b bg-background px-4 py-4 space-y-4">
            {mobileMenu ? (
              mobileMenu({ isOpen: isMenuOpen, close: closeMenu })
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">{links}</div>
                <div className="pt-2 border-t flex flex-col gap-2">{actions}</div>
              </div>
            )}
          </div>
        )}

        {children}
      </header>
    );
  }
);

Navbar.displayName = "Navbar";
