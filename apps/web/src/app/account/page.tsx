import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@repo/ui";

export default async function AccountPage() {
  const headersList = await headers();
  const role = headersList.get("x-user-role") || "user";
  const name = headersList.get("x-user-name") || "User";

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="rounded-lg border bg-card p-8 shadow-sm text-card-foreground">
        <div className="flex items-center justify-between pb-6 border-b">
          <div>
            <h1 className="text-2xl font-bold">Account Overview</h1>
            <p className="text-sm text-muted-foreground">User account placeholder</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
            {role}
          </span>
        </div>

        <div className="py-8 space-y-4">
          <p className="text-lg font-medium text-foreground">
            Protected — you are logged in as <span className="font-semibold text-primary">{role}</span> ({name})
          </p>
          <p className="text-sm text-muted-foreground">
            This route is guarded server-side by Next.js middleware and NestJS JWT Auth.
          </p>
        </div>

        <div className="pt-6 border-t flex items-center justify-between">
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
