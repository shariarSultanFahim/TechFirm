import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";

export class AuthorDto {
  @ApiProperty({ example: "Sarah Jenkins" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional({ example: "Senior Cloud Architect" })
  @IsString()
  @IsOptional()
  role?: string;
}

export class CreatePostDto {
  @ApiProperty({ example: "The Future of Cloud Architecture in 2026" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: "the-future-of-cloud-architecture-in-2026" })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ example: "Exploring how distributed edge clouds and automated orchestration shape modern web applications." })
  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @ApiProperty({ example: "Full article body markdown or html text..." })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ example: "https://images.unsplash.com/photo-1451187580459-43490279c0fa" })
  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @ApiProperty({ example: "Technology" })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ type: AuthorDto })
  @ValidateNested()
  @Type(() => AuthorDto)
  author: AuthorDto;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  publishedAt?: Date;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({ default: "5 min read" })
  @IsString()
  @IsOptional()
  readTime?: string;

  @ApiPropertyOptional({ example: ["Cloud", "DevOps", "Kubernetes"] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

export class UpdatePostDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  body?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ type: AuthorDto })
  @ValidateNested()
  @Type(() => AuthorDto)
  @IsOptional()
  author?: AuthorDto;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  publishedAt?: Date;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readTime?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

export class QueryPostDto {
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

  @ApiPropertyOptional({ example: "Technology" })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: "cloud" })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isPublished?: boolean;
}
