import { headers } from "next/headers";
import { Badge, SectionHeading } from "@repo/ui";

export default async function DashboardUsersPage() {
  const headersList = await headers();
  const role = headersList.get("x-user-role") || "admin";

  return (
    <div className="space-y-8">
      <SectionHeading
        badge={<Badge variant="default">User Management</Badge>}
        title="Users Administration"
        description="Manage user accounts, roles, and permissions."
      />

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <p className="text-base font-medium text-foreground">
          Protected — you are logged in as <span className="font-bold text-primary capitalize">{role}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Placeholder module for future user management CRUD screens.
        </p>
      </div>
    </div>
  );
}
