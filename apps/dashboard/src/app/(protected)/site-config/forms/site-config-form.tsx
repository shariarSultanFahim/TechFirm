"use client";

import * as React from "react";

import {
  CheckCircle2,
  Clock,
  Globe,
  LayoutTemplate,
  Mail,
  MapPin,
  Phone,
  Plus,
  Rocket,
  Share2,
  Trash2
} from "lucide-react";

import { ICtaBandConfig, IFooterLink, ISiteConfig, ISocialLinks, ITopBarConfig } from "@repo/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SiteConfigFormProps {
  initialConfig: ISiteConfig;
  onSubmit: (values: ISiteConfig) => void | Promise<void>;
  isLoading?: boolean;
}

export function SiteConfigForm({ initialConfig, onSubmit }: SiteConfigFormProps) {
  const [formData, setFormData] = React.useState<ISiteConfig>(initialConfig);
  const [badgeInput, setBadgeInput] = React.useState("");

  const handleGeneralChange = (
    field: keyof Pick<
      ISiteConfig,
      | "siteName"
      | "siteLogo"
      | "tagline"
      | "contactEmail"
      | "contactPhone"
      | "workingHours"
      | "address"
    >,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (key: keyof ISocialLinks, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...(prev.socialLinks || {}),
        [key]: value
      }
    }));
  };

  const handleTopBarChange = (updates: Partial<ITopBarConfig>) => {
    setFormData((prev) => ({
      ...prev,
      topBar: {
        announcement: prev.topBar?.announcement || "",
        isVisible: prev.topBar?.isVisible ?? true,
        ...updates
      }
    }));
  };

  const handleCtaChange = (updates: Partial<ICtaBandConfig>) => {
    setFormData((prev) => ({
      ...prev,
      ctaBand: {
        title: prev.ctaBand?.title || "",
        subtitle: prev.ctaBand?.subtitle || "",
        buttonText: prev.ctaBand?.buttonText || "",
        buttonHref: prev.ctaBand?.buttonHref || "",
        badges: prev.ctaBand?.badges || [],
        ...updates
      }
    }));
  };

  const handleAddBadge = () => {
    if (!badgeInput.trim()) return;
    const currentBadges = formData.ctaBand?.badges || [];
    handleCtaChange({ badges: [...currentBadges, badgeInput.trim()] });
    setBadgeInput("");
  };

  const handleRemoveBadge = (index: number) => {
    const currentBadges = formData.ctaBand?.badges || [];
    handleCtaChange({
      badges: currentBadges.filter((_, i) => i !== index)
    });
  };

  const handleAddFooterLink = (
    column: "collaborateLinks" | "myAccountLinks" | "serviceLinks" | "bottomLinks"
  ) => {
    const currentList = formData.footer?.[column] || [];
    setFormData((prev) => ({
      ...prev,
      footer: {
        copyrightText: prev.footer?.copyrightText || "",
        collaborateLinks: prev.footer?.collaborateLinks || [],
        myAccountLinks: prev.footer?.myAccountLinks || [],
        serviceLinks: prev.footer?.serviceLinks || [],
        bottomLinks: prev.footer?.bottomLinks || [],
        [column]: [...currentList, { label: "New Link", href: "#" }]
      }
    }));
  };

  const handleUpdateFooterLink = (
    column: "collaborateLinks" | "myAccountLinks" | "serviceLinks" | "bottomLinks",
    index: number,
    field: keyof IFooterLink,
    value: string
  ) => {
    const currentList = [...(formData.footer?.[column] || [])];
    if (currentList[index]) {
      currentList[index] = { ...currentList[index], [field]: value };
      setFormData((prev) => ({
        ...prev,
        footer: {
          copyrightText: prev.footer?.copyrightText || "",
          collaborateLinks: prev.footer?.collaborateLinks || [],
          myAccountLinks: prev.footer?.myAccountLinks || [],
          serviceLinks: prev.footer?.serviceLinks || [],
          bottomLinks: prev.footer?.bottomLinks || [],
          [column]: currentList
        }
      }));
    }
  };

  const handleRemoveFooterLink = (
    column: "collaborateLinks" | "myAccountLinks" | "serviceLinks" | "bottomLinks",
    index: number
  ) => {
    const currentList = (formData.footer?.[column] || []).filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      footer: {
        copyrightText: prev.footer?.copyrightText || "",
        collaborateLinks: prev.footer?.collaborateLinks || [],
        myAccountLinks: prev.footer?.myAccountLinks || [],
        serviceLinks: prev.footer?.serviceLinks || [],
        bottomLinks: prev.footer?.bottomLinks || [],
        [column]: currentList
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="general" className="w-full space-y-6">
        <TabsList className="bg-muted/60 grid h-auto w-full max-w-3xl grid-cols-2 gap-1.5 rounded-xl p-1.5 sm:grid-cols-4">
          <TabsTrigger
            value="general"
            className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold"
          >
            <Globe className="text-primary h-4 w-4" />
            <span>General &amp; Contacts</span>
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold"
          >
            <Share2 className="text-primary h-4 w-4" />
            <span>Social Links</span>
          </TabsTrigger>
          <TabsTrigger
            value="cta"
            className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold"
          >
            <Rocket className="text-primary h-4 w-4" />
            <span>Launch CTA Band</span>
          </TabsTrigger>
          <TabsTrigger
            value="footer"
            className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold"
          >
            <LayoutTemplate className="text-primary h-4 w-4" />
            <span>Footer Navigation</span>
          </TabsTrigger>
        </TabsList>

        {/* 1. General & Contacts */}
        <TabsContent value="general" className="space-y-6">
          <div className="bg-card border-border space-y-6 rounded-2xl border p-6 shadow-xs sm:p-8">
            <h3 className="text-foreground border-border flex items-center gap-2 border-b pb-3 text-base font-bold">
              <Globe className="text-primary h-4 w-4" />
              Brand &amp; Identity
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  Site Name
                </label>
                <Input
                  value={formData.siteName || ""}
                  onChange={(e) => handleGeneralChange("siteName", e.target.value)}
                  placeholder="TechFirm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  Tagline / Subheading
                </label>
                <Input
                  value={formData.tagline || ""}
                  onChange={(e) => handleGeneralChange("tagline", e.target.value)}
                  placeholder="IT SOLUTION COMPANY"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  Logo Image URL
                </label>
                <Input
                  value={formData.siteLogo || ""}
                  onChange={(e) => handleGeneralChange("siteLogo", e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>

            <h3 className="text-foreground border-border flex items-center gap-2 border-b pt-4 pb-3 text-base font-bold">
              <Mail className="text-primary h-4 w-4" />
              Contact &amp; Working Hours
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                  <Mail className="text-primary h-3.5 w-3.5" />
                  Contact Email
                </label>
                <Input
                  type="email"
                  value={formData.contactEmail || ""}
                  onChange={(e) => handleGeneralChange("contactEmail", e.target.value)}
                  placeholder="contact@techfirm.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                  <Phone className="text-primary h-3.5 w-3.5" />
                  Contact Phone
                </label>
                <Input
                  value={formData.contactPhone || ""}
                  onChange={(e) => handleGeneralChange("contactPhone", e.target.value)}
                  placeholder="+1 (555) 234-5678"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                  <Clock className="text-primary h-3.5 w-3.5" />
                  Working Hours
                </label>
                <Input
                  value={formData.workingHours || ""}
                  onChange={(e) => handleGeneralChange("workingHours", e.target.value)}
                  placeholder="Mon - Fri: 9:00 AM - 6:00 PM"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                  <MapPin className="text-primary h-3.5 w-3.5" />
                  Office Address
                </label>
                <Input
                  value={formData.address || ""}
                  onChange={(e) => handleGeneralChange("address", e.target.value)}
                  placeholder="1200 Tech Blvd, Suite 400, San Francisco, CA"
                />
              </div>
            </div>

            <h3 className="text-foreground border-border flex items-center justify-between border-b pt-4 pb-3 text-base font-bold">
              <span className="flex items-center gap-2">
                <Clock className="text-primary h-4 w-4" />
                Top Announcement Bar
              </span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs font-medium">Visible</span>
                <Switch
                  checked={formData.topBar?.isVisible ?? true}
                  onCheckedChange={(checked) => handleTopBarChange({ isVisible: checked })}
                />
              </div>
            </h3>

            <div className="space-y-2">
              <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Announcement Message
              </label>
              <Input
                value={formData.topBar?.announcement || ""}
                onChange={(e) => handleTopBarChange({ announcement: e.target.value })}
                placeholder="24/7 Managed Cloud Support & Zero-Trust IT Services"
              />
            </div>
          </div>
        </TabsContent>

        {/* 2. Social Links */}
        <TabsContent value="social" className="space-y-6">
          <div className="bg-card border-border space-y-6 rounded-2xl border p-6 shadow-xs sm:p-8">
            <h3 className="text-foreground border-border flex items-center gap-2 border-b pb-3 text-base font-bold">
              <Share2 className="text-primary h-4 w-4" />
              Social Media Profiles
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  Facebook URL
                </label>
                <Input
                  value={formData.socialLinks?.facebook || ""}
                  onChange={(e) => handleSocialChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/techfirm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  Twitter / X URL
                </label>
                <Input
                  value={formData.socialLinks?.twitter || ""}
                  onChange={(e) => handleSocialChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/techfirm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  LinkedIn URL
                </label>
                <Input
                  value={formData.socialLinks?.linkedin || ""}
                  onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/techfirm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  Instagram URL
                </label>
                <Input
                  value={formData.socialLinks?.instagram || ""}
                  onChange={(e) => handleSocialChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/techfirm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  GitHub URL
                </label>
                <Input
                  value={formData.socialLinks?.github || ""}
                  onChange={(e) => handleSocialChange("github", e.target.value)}
                  placeholder="https://github.com/techfirm"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 3. Launch CTA Band */}
        <TabsContent value="cta" className="space-y-6">
          <div className="bg-card border-border space-y-6 rounded-2xl border p-6 shadow-xs sm:p-8">
            <h3 className="text-foreground border-border flex items-center gap-2 border-b pb-3 text-base font-bold">
              <Rocket className="text-primary h-4 w-4" />
              Launch CTA Banner Overlap
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  Banner Headline
                </label>
                <Input
                  value={formData.ctaBand?.title || ""}
                  onChange={(e) => handleCtaChange({ title: e.target.value })}
                  placeholder="Ready to Launch with Techfirm?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  Banner Subtitle
                </label>
                <Input
                  value={formData.ctaBand?.subtitle || ""}
                  onChange={(e) => handleCtaChange({ subtitle: e.target.value })}
                  placeholder="Start hosting with lightning speed, built-in security, and real support..."
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                    Button Label
                  </label>
                  <Input
                    value={formData.ctaBand?.buttonText || ""}
                    onChange={(e) => handleCtaChange({ buttonText: e.target.value })}
                    placeholder="7-Day Free Trial"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                    Button Link (Href)
                  </label>
                  <Input
                    value={formData.ctaBand?.buttonHref || ""}
                    onChange={(e) => handleCtaChange({ buttonHref: e.target.value })}
                    placeholder="#pricing"
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-3 pt-3">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  Feature Badges (Checkmark Pills)
                </label>
                <div className="mb-3 flex flex-wrap gap-2">
                  {(formData.ctaBand?.badges || []).map((badge, idx) => (
                    <span
                      key={idx}
                      className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{badge}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBadge(idx)}
                        className="hover:text-destructive ml-1 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex max-w-md items-center gap-2">
                  <Input
                    value={badgeInput}
                    onChange={(e) => setBadgeInput(e.target.value)}
                    placeholder="e.g. Ironclad Security"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddBadge();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddBadge}
                    className="shrink-0 font-bold"
                  >
                    <Plus className="mr-1 h-4 w-4" /> Add Badge
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 4. Footer Navigation */}
        <TabsContent value="footer" className="space-y-6">
          <div className="bg-card border-border space-y-6 rounded-2xl border p-6 shadow-xs sm:p-8">
            <h3 className="text-foreground border-border flex items-center gap-2 border-b pb-3 text-base font-bold">
              <LayoutTemplate className="text-primary h-4 w-4" />
              Footer Copyright
            </h3>

            <div className="space-y-2">
              <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Copyright Notice
              </label>
              <Input
                value={formData.footer?.copyrightText || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    footer: {
                      collaborateLinks: prev.footer?.collaborateLinks || [],
                      myAccountLinks: prev.footer?.myAccountLinks || [],
                      serviceLinks: prev.footer?.serviceLinks || [],
                      bottomLinks: prev.footer?.bottomLinks || [],
                      copyrightText: e.target.value
                    }
                  }))
                }
                placeholder="Copyright @2026 BizanTheme All Rights Reserved"
              />
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-2">
              {/* Collaborate Column */}
              <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-foreground text-sm font-bold">Column 1: Collaborate</h4>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddFooterLink("collaborateLinks")}
                    className="h-8 text-xs font-bold"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add Link
                  </Button>
                </div>
                <div className="space-y-2.5">
                  {(formData.footer?.collaborateLinks || []).map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={link.label}
                        onChange={(e) =>
                          handleUpdateFooterLink("collaborateLinks", idx, "label", e.target.value)
                        }
                        placeholder="Label"
                        className="w-1/2 text-xs"
                      />
                      <Input
                        value={link.href}
                        onChange={(e) =>
                          handleUpdateFooterLink("collaborateLinks", idx, "href", e.target.value)
                        }
                        placeholder="Href (# or /page)"
                        className="w-1/2 text-xs"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveFooterLink("collaborateLinks", idx)}
                        className="text-destructive h-8 w-8 shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* My Account Column */}
              <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-foreground text-sm font-bold">
                    Column 2: My Account / Company
                  </h4>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddFooterLink("myAccountLinks")}
                    className="h-8 text-xs font-bold"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add Link
                  </Button>
                </div>
                <div className="space-y-2.5">
                  {(formData.footer?.myAccountLinks || []).map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={link.label}
                        onChange={(e) =>
                          handleUpdateFooterLink("myAccountLinks", idx, "label", e.target.value)
                        }
                        placeholder="Label"
                        className="w-1/2 text-xs"
                      />
                      <Input
                        value={link.href}
                        onChange={(e) =>
                          handleUpdateFooterLink("myAccountLinks", idx, "href", e.target.value)
                        }
                        placeholder="Href"
                        className="w-1/2 text-xs"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveFooterLink("myAccountLinks", idx)}
                        className="text-destructive h-8 w-8 shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Column */}
              <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-foreground text-sm font-bold">Column 3: Services</h4>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddFooterLink("serviceLinks")}
                    className="h-8 text-xs font-bold"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add Link
                  </Button>
                </div>
                <div className="space-y-2.5">
                  {(formData.footer?.serviceLinks || []).map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={link.label}
                        onChange={(e) =>
                          handleUpdateFooterLink("serviceLinks", idx, "label", e.target.value)
                        }
                        placeholder="Label"
                        className="w-1/2 text-xs"
                      />
                      <Input
                        value={link.href}
                        onChange={(e) =>
                          handleUpdateFooterLink("serviceLinks", idx, "href", e.target.value)
                        }
                        placeholder="Href"
                        className="w-1/2 text-xs"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveFooterLink("serviceLinks", idx)}
                        className="text-destructive h-8 w-8 shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Links Column */}
              <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-foreground text-sm font-bold">Bottom Bar Links</h4>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddFooterLink("bottomLinks")}
                    className="h-8 text-xs font-bold"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add Link
                  </Button>
                </div>
                <div className="space-y-2.5">
                  {(formData.footer?.bottomLinks || []).map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={link.label}
                        onChange={(e) =>
                          handleUpdateFooterLink("bottomLinks", idx, "label", e.target.value)
                        }
                        placeholder="Label"
                        className="w-1/2 text-xs"
                      />
                      <Input
                        value={link.href}
                        onChange={(e) =>
                          handleUpdateFooterLink("bottomLinks", idx, "href", e.target.value)
                        }
                        placeholder="Href"
                        className="w-1/2 text-xs"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveFooterLink("bottomLinks", idx)}
                        className="text-destructive h-8 w-8 shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
