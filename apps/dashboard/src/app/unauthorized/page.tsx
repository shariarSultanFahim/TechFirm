import { Button } from "@repo/ui";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="rounded-full bg-destructive/10 p-4 mb-4 text-destructive text-3xl">
        🚫
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Access Denied</h1>
      <p className="text-muted-foreground text-sm max-w-md mb-6">
        You do not have administrative privileges to access this console. This portal is restricted to users with the <span className="font-semibold text-foreground">admin</span> role.
      </p>
      <div className="flex items-center gap-3">
        <a href="http://localhost:3000">
          <Button variant="primary">Return to Public Portal</Button>
        </a>
        <a href="http://localhost:3000/login">
          <Button variant="secondary">Switch Account</Button>
        </a>
      </div>
    </div>
  );
}
