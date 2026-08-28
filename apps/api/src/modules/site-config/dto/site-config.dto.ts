import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

export class SocialLinksDto {
  @ApiPropertyOptional({ example: "https://facebook.com/techfirm" })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiPropertyOptional({ example: "https://twitter.com/techfirm" })
  @IsString()
  @IsOptional()
  twitter?: string;

  @ApiPropertyOptional({ example: "https://linkedin.com/company/techfirm" })
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional({ example: "https://instagram.com/techfirm" })
  @IsString()
  @IsOptional()
  instagram?: string;

  @ApiPropertyOptional({ example: "https://github.com/techfirm" })
  @IsString()
  @IsOptional()
  github?: string;
}

export class TopBarConfigDto {
  @ApiPropertyOptional({ example: "New cloud features available now!" })
  @IsString()
  @IsOptional()
  announcement?: string;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}

export class CtaBandConfigDto {
  @ApiPropertyOptional({ example: "Ready to Launch with Techfirm?" })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example:
      "Start hosting with lightning speed, built-in security, and real support — in just a few clicks."
  })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiPropertyOptional({ example: "7-Day Free Trial" })
  @IsString()
  @IsOptional()
  buttonText?: string;

  @ApiPropertyOptional({ example: "#pricing" })
  @IsString()
  @IsOptional()
  buttonHref?: string;

  @ApiPropertyOptional({
    example: ["Lightning Speed", "Ironclad Security", "Scalable Hosting"]
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  badges?: string[];
}

export class FooterLinkDto {
  @ApiPropertyOptional({ example: "Partners" })
  @IsString()
  label: string;

  @ApiPropertyOptional({ example: "/partners" })
  @IsString()
  href: string;
}

export class FooterConfigDto {
  @ApiPropertyOptional({ example: "Copyright @2026 BizanTheme All Rights Reserved" })
  @IsString()
  @IsOptional()
  copyrightText?: string;

  @ApiPropertyOptional({ type: [FooterLinkDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FooterLinkDto)
  @IsOptional()
  collaborateLinks?: FooterLinkDto[];

  @ApiPropertyOptional({ type: [FooterLinkDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FooterLinkDto)
  @IsOptional()
  myAccountLinks?: FooterLinkDto[];

  @ApiPropertyOptional({ type: [FooterLinkDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FooterLinkDto)
  @IsOptional()
  serviceLinks?: FooterLinkDto[];

  @ApiPropertyOptional({ type: [FooterLinkDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FooterLinkDto)
  @IsOptional()
  bottomLinks?: FooterLinkDto[];
}

export class UpdateSiteConfigDto {
  @ApiPropertyOptional({ example: "TechFirm" })
  @IsString()
  @IsOptional()
  siteName?: string;

  @ApiPropertyOptional({
    example: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200"
  })
  @IsString()
  @IsOptional()
  siteLogo?: string;

  @ApiPropertyOptional({ example: "IT SOLUTION COMPANY" })
  @IsString()
  @IsOptional()
  tagline?: string;

  @ApiPropertyOptional({ example: "contact@techfirm.com" })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiPropertyOptional({ example: "+1 (555) 234-5678" })
  @IsString()
  @IsOptional()
  contactPhone?: string;

  @ApiPropertyOptional({ example: "Mon - Fri: 9:00 AM - 6:00 PM" })
  @IsString()
  @IsOptional()
  workingHours?: string;

  @ApiPropertyOptional({ example: "1200 Tech Blvd, Suite 400, San Francisco, CA 94107" })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ type: SocialLinksDto })
  @IsObject()
  @ValidateNested()
  @Type(() => SocialLinksDto)
  @IsOptional()
  socialLinks?: SocialLinksDto;

  @ApiPropertyOptional({ type: TopBarConfigDto })
  @IsObject()
  @ValidateNested()
  @Type(() => TopBarConfigDto)
  @IsOptional()
  topBar?: TopBarConfigDto;

  @ApiPropertyOptional({ type: CtaBandConfigDto })
  @IsObject()
  @ValidateNested()
  @Type(() => CtaBandConfigDto)
  @IsOptional()
  ctaBand?: CtaBandConfigDto;

  @ApiPropertyOptional({ type: FooterConfigDto })
  @IsObject()
  @ValidateNested()
  @Type(() => FooterConfigDto)
  @IsOptional()
  footer?: FooterConfigDto;
}
