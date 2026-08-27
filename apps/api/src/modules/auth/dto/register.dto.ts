import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "Alex Smith", description: "User's full name" })
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @ApiProperty({ example: "alex@example.com", description: "User email address" })
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @ApiProperty({ example: "SecurePass123!", description: "Account password", minLength: 8 })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password: string;
}
