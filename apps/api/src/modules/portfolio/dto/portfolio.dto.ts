import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

export class PortfolioResultDto {
  @ApiProperty({ example: "99.999% SLA" })
  @IsString()
  title: string;

  @ApiProperty({ example: "Zero downtime achieved throughout peak surges." })
  @IsString()
  description: string;
}

export class CreatePortfolioItemDto {
  @ApiProperty({ example: "Maximizing Efficiency with Proper Technology" })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: "An elegant and intuitive education app" })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiPropertyOptional({ example: "Technology", default: "Technology" })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: "Education & E-Learning" })
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiPropertyOptional({ example: "Overview description of the client engagement..." })
  @IsString()
  @IsOptional()
  overview?: string;

  @ApiProperty({ example: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800" })
  @IsString()
  image: string;

  @ApiPropertyOptional({
    example: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800"
  })
  @IsString()
  @IsOptional()
  bgImage?: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isDark?: boolean;

  @ApiPropertyOptional({ default: "View Project" })
  @IsString()
  @IsOptional()
  actionText?: string;

  @ApiPropertyOptional({ example: ["Initial challenge paragraph 1", "Challenge paragraph 2"] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  challengeText?: string[];

  @ApiPropertyOptional({ example: ["Architected solution paragraph 1", "Solution paragraph 2"] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  solutionText?: string[];

  @ApiPropertyOptional({ type: [PortfolioResultDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortfolioResultDto)
  @IsOptional()
  results?: PortfolioResultDto[];

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdatePortfolioItemDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  overview?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bgImage?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isDark?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  actionText?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  challengeText?: string[];

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  solutionText?: string[];

  @ApiPropertyOptional({ type: [PortfolioResultDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortfolioResultDto)
  @IsOptional()
  results?: PortfolioResultDto[];

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class QueryPortfolioItemsDto {
  @ApiPropertyOptional({ example: "Technology" })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: "true" })
  @IsString()
  @IsOptional()
  isActive?: string;

  @ApiPropertyOptional({ example: "education" })
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
