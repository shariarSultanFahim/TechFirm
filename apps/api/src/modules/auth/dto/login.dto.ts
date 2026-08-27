import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "user@example.com", description: "Registered email address" })
  @IsEmail({}, { message: "Invalid email address format" })
  email: string;

  @ApiProperty({ example: "User123!", description: "Account password" })
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}
