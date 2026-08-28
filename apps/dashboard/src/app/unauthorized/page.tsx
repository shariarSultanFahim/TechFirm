import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="bg-background text-foreground flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-4 text-3xl">🚫</div>
      <h1 className="text-foreground mb-2 text-2xl font-bold tracking-tight">Access Denied</h1>
      <p className="text-muted-foreground mb-6 max-w-md text-xs font-normal sm:text-sm">
        You do not have administrative privileges to access this console. This portal is restricted
        to users with the <span className="text-foreground font-medium">admin</span> role.
      </p>
      <div className="flex items-center gap-3">
        <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="text-xs font-medium">
            Visit Public Website
          </Button>
        </a>
        <Link href="/login">
          <Button variant="default" className="text-xs font-medium">
            Switch Admin Account
          </Button>
        </Link>
      </div>
    </div>
  );
}
