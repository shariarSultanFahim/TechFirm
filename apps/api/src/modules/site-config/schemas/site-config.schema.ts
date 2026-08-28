import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {
  ICtaBandConfig,
  IFooterConfig,
  ISiteConfig,
  ISocialLinks,
  ITopBarConfig
} from "@repo/types";

export type SiteConfigDocument = HydratedDocument<SiteConfig>;

@Schema({ _id: false })
export class SocialLinks implements ISocialLinks {
  @Prop({ default: "" })
  facebook?: string;

  @Prop({ default: "" })
  twitter?: string;

  @Prop({ default: "" })
  linkedin?: string;

  @Prop({ default: "" })
  instagram?: string;

  @Prop({ default: "" })
  github?: string;
}

@Schema({ _id: false })
export class TopBarConfig implements ITopBarConfig {
  @Prop({ default: "" })
  announcement?: string;

  @Prop({ default: true })
  isVisible: boolean;
}

@Schema({ _id: false })
export class CtaBandConfig implements ICtaBandConfig {
  @Prop({ default: "Ready to Launch with Techfirm?" })
  title: string;

  @Prop({
    default:
      "Start hosting with lightning speed, built-in security, and real support — in just a few clicks."
  })
  subtitle: string;

  @Prop({ default: "7-Day Free Trial" })
  buttonText: string;

  @Prop({ default: "#pricing" })
  buttonHref: string;

  @Prop({
    type: [String],
    default: ["Lightning Speed", "Ironclad Security", "Scalable Hosting"]
  })
  badges: string[];
}

@Schema({ _id: false })
export class FooterLink {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  href: string;
}

@Schema({ _id: false })
export class FooterConfig implements IFooterConfig {
  @Prop({ default: "Copyright @2026 BizanTheme All Rights Reserved" })
  copyrightText: string;

  @Prop({ type: [FooterLink], default: [] })
  collaborateLinks: FooterLink[];

  @Prop({ type: [FooterLink], default: [] })
  myAccountLinks: FooterLink[];

  @Prop({ type: [FooterLink], default: [] })
  serviceLinks: FooterLink[];

  @Prop({ type: [FooterLink], default: [] })
  bottomLinks: FooterLink[];
}

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_, ret: Record<string, any>) => {
      if (ret._id) {
        ret.id = ret._id.toString();
      }
      delete ret._id;
      return ret;
    }
  }
})
export class SiteConfig implements ISiteConfig {
  @Prop({ required: true, default: "TechFirm", trim: true })
  siteName: string;

  @Prop({
    required: true,
    default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
    trim: true
  })
  siteLogo: string;

  @Prop({ default: "IT SOLUTION COMPANY", trim: true })
  tagline?: string;

  @Prop({ required: true, default: "contact@techfirm.com", trim: true })
  contactEmail: string;

  @Prop({ required: true, default: "+1 (555) 234-5678", trim: true })
  contactPhone: string;

  @Prop({ default: "Mon - Fri: 9:00 AM - 6:00 PM", trim: true })
  workingHours?: string;

  @Prop({ default: "1200 Tech Blvd, Suite 400, San Francisco, CA 94107", trim: true })
  address?: string;

  @Prop({ type: SocialLinks, default: () => ({}) })
  socialLinks: SocialLinks;

  @Prop({ type: TopBarConfig, default: () => ({ isVisible: true }) })
  topBar?: TopBarConfig;

  @Prop({ type: CtaBandConfig, default: () => ({}) })
  ctaBand: CtaBandConfig;

  @Prop({ type: FooterConfig, default: () => ({}) })
  footer: FooterConfig;

  createdAt: Date;
  updatedAt: Date;
}

export const SiteConfigSchema = SchemaFactory.createForClass(SiteConfig);
