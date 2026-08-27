import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { Request, Response } from "express";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Public } from "../../common/decorators/public.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register a new user account" })
  @SwaggerApiResponse({ status: 201, description: "User registered successfully" })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { user, tokens } = await this.authService.register(registerDto);
    this.authService.setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    return {
      message: "Registration successful",
      data: { user }
    };
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Authenticate user and issue auth cookies" })
  @SwaggerApiResponse({ status: 200, description: "Logged in successfully" })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { user, tokens } = await this.authService.login(loginDto);
    this.authService.setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    return {
      message: "Login successful",
      data: { user }
    };
  }

  @Public()
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiOperation({ summary: "Refresh access token using refreshToken cookie" })
  @SwaggerApiResponse({ status: 200, description: "Tokens refreshed successfully" })
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const refreshToken = request.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException("No refresh token found in request cookies");
    }

    const { user, tokens } = await this.authService.refreshTokens(refreshToken);
    this.authService.setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    return {
      message: "Token refreshed successfully",
      data: { user }
    };
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Logout user and invalidate authentication cookies" })
  @SwaggerApiResponse({ status: 200, description: "Logged out successfully" })
  async logout(
    @CurrentUser("id") userId: string,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.logout(userId);
    this.authService.clearAuthCookies(response);

    return {
      message: "Logged out successfully",
      data: null
    };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get currently authenticated user context" })
  @SwaggerApiResponse({ status: 200, description: "Current user profile" })
  async getProfile(@CurrentUser() user: any) {
    return {
      message: "Profile retrieved successfully",
      data: { user }
    };
  }
}
