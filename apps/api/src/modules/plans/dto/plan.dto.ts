import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min
} from "class-validator";
import { BillingPeriod } from "@repo/types";

export class CreatePlanDto {
  @ApiProperty({ example: "Standard Cloud Plan" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 49 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ enum: ["monthly", "annual"], default: "monthly" })
  @IsEnum(["monthly", "annual"])
  billingPeriod: BillingPeriod;

  @ApiProperty({ example: ["Unlimited Bandwidth", "24/7 Support", "Free Domain"] })
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isPopular?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional({ example: "Best suited for fast-growing startups" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ default: "Get Started" })
  @IsString()
  @IsOptional()
  buttonText?: string;
}

export class UpdatePlanDto {
  @ApiPropertyOptional({ example: "Standard Cloud Plan" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 49 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ enum: ["monthly", "annual"] })
  @IsEnum(["monthly", "annual"])
  @IsOptional()
  billingPeriod?: BillingPeriod;

  @ApiPropertyOptional({ example: ["Unlimited Bandwidth", "24/7 Support"] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isPopular?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  buttonText?: string;
}

export class QueryPlanDto {
  @ApiPropertyOptional({ enum: ["monthly", "annual"] })
  @IsEnum(["monthly", "annual"])
  @IsOptional()
  billingPeriod?: BillingPeriod;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;
}
