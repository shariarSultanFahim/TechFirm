import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { SocialLinksDto } from "../../site-config/dto/site-config.dto";

export class CreateTeamMemberDto {
  @ApiProperty({ example: "Michael Carter" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Chief Solutions Architect" })
  @IsString()
  role: string;

  @ApiPropertyOptional({
    example:
      "Over 15 years leading enterprise cloud transformations, Kubernetes cluster deployments, and hybrid migrations."
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({
    example: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800"
  })
  @IsString()
  photo: string;

  @ApiPropertyOptional({ example: "m.carter@techfirm.com" })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: "+1 (555) 019-2834" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ type: SocialLinksDto })
  @IsObject()
  @ValidateNested()
  @Type(() => SocialLinksDto)
  @IsOptional()
  socialLinks?: SocialLinksDto;

  @ApiPropertyOptional({ example: ["Cloud Architecture", "Kubernetes", "DevOps", "Terraform"] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @ApiPropertyOptional({ example: "15+ Years" })
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateTeamMemberDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  role?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ type: SocialLinksDto })
  @IsObject()
  @ValidateNested()
  @Type(() => SocialLinksDto)
  @IsOptional()
  socialLinks?: SocialLinksDto;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class QueryTeamMembersDto {
  @ApiPropertyOptional({ example: "true" })
  @IsString()
  @IsOptional()
  isActive?: string;

  @ApiPropertyOptional({ example: "carter" })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 20 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;
}
