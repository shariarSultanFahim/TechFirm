import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";

export class CreateContactMessageDto {
  @ApiProperty({ example: "Alex Johnson" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "alex@example.com" })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: "Cloud Architecture Inquiry" })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({ example: "Hello, I would like to inquire about your enterprise cloud migration services." })
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class UpdateContactMessageDto {
  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}

export class QueryContactMessageDto {
  @ApiPropertyOptional({ default: 1 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isRead?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}
