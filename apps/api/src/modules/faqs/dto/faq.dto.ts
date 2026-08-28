import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateFaqDto {
  @ApiProperty({ example: "How do I know if I need a consultant?" })
  @IsString()
  question: string;

  @ApiProperty({
    example:
      "If your business is facing scaling challenges, our team provides targeted solutions..."
  })
  @IsString()
  answer: string;

  @ApiPropertyOptional({ example: "General", default: "General" })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateFaqDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  question?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  answer?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class QueryFaqsDto {
  @ApiPropertyOptional({ example: "General" })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: "true" })
  @IsString()
  @IsOptional()
  isActive?: string;

  @ApiPropertyOptional({ example: "consultant" })
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
