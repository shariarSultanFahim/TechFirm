import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateSiteConfigDto } from "./dto/site-config.dto";
import { SiteConfig, SiteConfigDocument } from "./schemas/site-config.schema";

@Injectable()
export class SiteConfigService {
  private readonly logger = new Logger(SiteConfigService.name);

  constructor(
    @InjectModel(SiteConfig.name)
    private readonly siteConfigModel: Model<SiteConfigDocument>
  ) {}

  /**
   * Get the singleton site configuration document.
   * If none exists, creates and returns the default configuration.
   */
  async getConfig(): Promise<SiteConfigDocument> {
    let config = await this.siteConfigModel.findOne().exec();
    if (!config) {
      this.logger.log("No site configuration found. Creating default document...");
      config = await this.siteConfigModel.create({
        siteName: "TechFirm",
        siteLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
        tagline: "IT SOLUTION COMPANY",
        contactEmail: "contact@techfirm.com",
        contactPhone: "+1 (555) 234-5678",
        workingHours: "Mon - Fri: 9:00 AM - 6:00 PM",
        address: "1200 Tech Blvd, Suite 400, San Francisco, CA 94107",
        socialLinks: {
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com",
          instagram: "https://instagram.com",
          github: "https://github.com"
        },
        topBar: {
          announcement: "24/7 Managed Cloud Support & Zero-Trust IT Services",
          isVisible: true
        },
        ctaBand: {
          title: "Ready to Launch with Techfirm?",
          subtitle:
            "Start hosting with lightning speed, built-in security, and real support — in just a few clicks.",
          buttonText: "7-Day Free Trial",
          buttonHref: "#pricing",
          badges: ["Lightning Speed", "Ironclad Security", "Scalable Hosting"]
        },
        footer: {
          copyrightText: "Copyright @2026 BizanTheme All Rights Reserved",
          collaborateLinks: [
            { label: "Partners", href: "#" },
            { label: "Partners Program", href: "#" },
            { label: "Affiliate Program", href: "#" },
            { label: "Community", href: "#" },
            { label: "HR Partner Program", href: "#" }
          ],
          myAccountLinks: [
            { label: "Company", href: "/about" },
            { label: "Customer Success", href: "/portfolio" },
            { label: "Resources", href: "/blog" },
            { label: "Talk an Expert", href: "/contact" }
          ],
          serviceLinks: [
            { label: "Software Development", href: "/services" },
            { label: "Cloud Services", href: "/services" },
            { label: "AI Machine Learning", href: "/services" },
            { label: "Data Security", href: "/services" },
            { label: "Managed IT Support", href: "/services" }
          ],
          bottomLinks: [
            { label: "Faqs", href: "/faqs" },
            { label: "Setting", href: "#" },
            { label: "Privacy", href: "/privacy" },
            { label: "Contact", href: "/contact" }
          ]
        }
      });
    }
    return config;
  }

  /**
   * Update the singleton site configuration document.
   */
  async updateConfig(dto: UpdateSiteConfigDto): Promise<SiteConfigDocument> {
    const config = await this.siteConfigModel
      .findOneAndUpdate({}, { $set: dto }, { upsert: true, new: true, runValidators: true })
      .exec();
    return config;
  }
}
