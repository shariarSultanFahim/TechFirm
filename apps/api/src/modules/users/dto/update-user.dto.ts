import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "@repo/types";

export class UpdateUserDto {
  @ApiPropertyOptional({ example: "Johnathan Doe" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: "NewPassword123!" })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
