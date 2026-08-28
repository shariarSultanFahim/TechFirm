"use client";

import * as React from "react";

import { Globe, Save } from "lucide-react";

import { ISiteConfig } from "@repo/types";

import { useSiteConfig } from "@/hooks/use-site-config";
import { useUpdateSiteConfig } from "@/hooks/use-site-config-mutations";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { SiteConfigForm } from "./forms/site-config-form";

export default function SiteConfigPage() {
  const { data: config, isLoading } = useSiteConfig();
  const updateSiteConfig = useUpdateSiteConfig();

  const handleSave = async (values: ISiteConfig) => {
    await updateSiteConfig.mutateAsync(values);
  };

  if (isLoading || !config) {
    return (
      <div className="space-y-6 pb-12">
        <PageHeader
          title="Site Configuration"
          description="Manage global site metadata, contact details, announcement bar, CTA copy, and footer links."
          icon={Globe}
        />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full max-w-3xl rounded-xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Site Configuration"
        description="Manage global site metadata, contact details, announcement bar, CTA copy, and footer links."
        icon={Globe}
      >
        <Button
          type="submit"
          form="site-config-form"
          onClick={() => {
            const form = document.querySelector("form");
            if (form) form.requestSubmit();
          }}
          disabled={updateSiteConfig.isPending}
          className="flex items-center gap-2 text-xs font-bold shadow-md"
        >
          <Save className="h-4 w-4" />
          <span>{updateSiteConfig.isPending ? "Saving..." : "Save Changes"}</span>
        </Button>
      </PageHeader>

      <SiteConfigForm
        initialConfig={config}
        onSubmit={handleSave}
        isLoading={updateSiteConfig.isPending}
      />
    </div>
  );
}
