import { headers } from "next/headers";
import { Badge, SectionHeading } from "@repo/ui";

export default async function OverviewPage() {
  const headersList = await headers();
  const role = headersList.get("x-user-role") || "admin";
  const name = headersList.get("x-user-name") || "Admin User";
  const email = headersList.get("x-user-email") || "admin@example.com";

  return (
    <div className="space-y-8">
      <SectionHeading
        badge={<Badge variant="default">Admin Workspace</Badge>}
        title="Dashboard Overview"
        description="System administration and analytics control room."
      />

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Auth & Guard Verification</h3>
        <p className="text-base font-medium text-foreground">
          Protected — you are logged in as <span className="font-bold text-primary capitalize">{role}</span> ({name})
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Authenticated user account: <code className="bg-muted px-2 py-0.5 rounded text-xs">{email}</code>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border bg-card">
          <p className="text-sm font-medium text-muted-foreground">Admin RBAC Status</p>
          <p className="text-2xl font-bold mt-2 text-green-600">Active & Enforced</p>
          <p className="text-xs text-muted-foreground mt-1">Guarded via Next.js Middleware & NestJS RolesGuard</p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <p className="text-sm font-medium text-muted-foreground">Subdomain Readiness</p>
          <p className="text-2xl font-bold mt-2">admin.localhost:3001</p>
          <p className="text-xs text-muted-foreground mt-1">Cross-subdomain cookie session supported</p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <p className="text-sm font-medium text-muted-foreground">API Connection</p>
          <p className="text-2xl font-bold mt-2">NestJS + Mongoose</p>
          <p className="text-xs text-muted-foreground mt-1">Port 5000 (/api/v1)</p>
        </div>
      </div>
    </div>
  );
}
