import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "@repo/types";

export class CreateUserDto {
  @ApiProperty({ example: "John Doe", description: "The full name of the user" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "user@example.com", description: "Unique email address" })
  @IsEmail({}, { message: "Invalid email address" })
  email: string;

  @ApiProperty({
    example: "Password123!",
    description: "Account password (min 8 chars)",
    minLength: 8
  })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER, required: false })
  @IsEnum(UserRole, { message: "Role must be either 'admin' or 'user'" })
  @IsOptional()
  role?: UserRole;
}
