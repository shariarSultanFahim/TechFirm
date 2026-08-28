import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ContactMessageStatus } from "@repo/types";

export class CreateContactMessageDto {
  @ApiProperty({ example: "Alex Johnson" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "alex@example.com" })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: "+1 (555) 019-2834" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: "Cloud Architecture Inquiry" })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiPropertyOptional({ example: "cloud-hosting" })
  @IsString()
  @IsOptional()
  service?: string;

  @ApiProperty({
    example: "Hello, I would like to inquire about your enterprise cloud migration services."
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class UpdateContactMessageDto {
  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @ApiPropertyOptional({ enum: ["unread", "read", "replied", "archived"] })
  @IsEnum(["unread", "read", "replied", "archived"])
  @IsOptional()
  status?: ContactMessageStatus;

  @ApiPropertyOptional({ example: "Followed up via email on 2026-02-01" })
  @IsString()
  @IsOptional()
  replyNotes?: string;
}

export class QueryContactMessageDto {
  @ApiPropertyOptional({ default: 1 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ default: 50 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 50;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  isRead?: string;

  @ApiPropertyOptional({ enum: ["unread", "read", "replied", "archived"] })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}
