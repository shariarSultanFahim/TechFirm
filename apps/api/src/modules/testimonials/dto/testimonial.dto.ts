import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateTestimonialDto {
  @ApiProperty({ example: "Techfirm AI Website Builder takes out a lot of manual work..." })
  @IsString()
  quote: string;

  @ApiProperty({ example: "John Samuel" })
  @IsString()
  authorName: string;

  @ApiProperty({ example: "Assistant Manager" })
  @IsString()
  authorRole: string;

  @ApiPropertyOptional({ example: "Acme Horizons" })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty({ example: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" })
  @IsString()
  avatar: string;

  @ApiPropertyOptional({ example: 5, default: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({ example: ["Techfirm Horizons", "Best Quality"] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  hasVideo?: boolean;

  @ApiPropertyOptional({ example: "https://youtube.com/watch?v=..." })
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiPropertyOptional({ example: "https://images.unsplash.com/..." })
  @IsString()
  @IsOptional()
  posterImage?: string;

  @ApiPropertyOptional({ example: "bg-linear-to-br from-[#00C0FA] to-[#007BFE]" })
  @IsString()
  @IsOptional()
  iconBg?: string;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateTestimonialDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  quote?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  authorName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  authorRole?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  company?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  hasVideo?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  posterImage?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  iconBg?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class QueryTestimonialsDto {
  @ApiPropertyOptional({ example: "true" })
  @IsString()
  @IsOptional()
  isActive?: string;

  @ApiPropertyOptional({ example: 10 })
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
