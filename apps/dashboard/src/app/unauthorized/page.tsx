import Link from "next/link";

import { Button } from "@repo/ui";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-4 text-3xl">🚫</div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">Access Denied</h1>
      <p className="mb-6 max-w-md text-sm text-gray-400">
        You do not have administrative privileges to access this console. This portal is restricted
        to users with the <span className="font-semibold text-white">admin</span> role.
      </p>
      <div className="flex items-center gap-3">
        <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
          <Button variant="primary">Visit Public Website</Button>
        </a>
        <Link href="/login">
          <Button variant="secondary">Switch Admin Account</Button>
        </Link>
      </div>
    </div>
  );
}
