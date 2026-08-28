import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { CookieOptions, Response } from "express";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiresIn: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.accessSecret =
      this.configService.get<string>("JWT_ACCESS_SECRET") ||
      "default_access_secret_for_dev_only_change_in_prod";
    this.refreshSecret =
      this.configService.get<string>("JWT_REFRESH_SECRET") ||
      "default_refresh_secret_for_dev_only_change_in_prod";
    this.accessExpiresIn = this.configService.get<string>("JWT_ACCESS_EXPIRES_IN") || "15m";
    this.refreshExpiresIn = this.configService.get<string>("JWT_REFRESH_EXPIRES_IN") || "7d";
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const tokens = await this.generateTokens(user.id, user.email, user.name, user.role);

    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: user.toJSON(),
      tokens
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email, true);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const tokens = await this.generateTokens(user.id, user.email, user.name, user.role);

    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: user.toJSON(),
      tokens
    };
  }

  async refreshTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is required");
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.refreshSecret
      });
    } catch {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    const user = await this.usersService.findByEmail(payload.email, true);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException("Access Denied: Session revoked");
    }

    const isTokenMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isTokenMatch) {
      // Possible token reuse attempt
      await this.usersService.updateRefreshToken(user.id, null);
      throw new UnauthorizedException("Access Denied: Invalid session");
    }

    const tokens = await this.generateTokens(user.id, user.email, user.name, user.role);
    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: user.toJSON(),
      tokens
    };
  }

  async logout(userId: string) {
    if (userId) {
      await this.usersService.updateRefreshToken(userId, null);
    }
  }

  async generateTokens(userId: string, email: string, name: string, role: string) {
    const payload = { sub: userId, email, name, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.accessSecret,
        expiresIn: this.accessExpiresIn as any
      }),
      this.jwtService.signAsync(payload, {
        secret: this.refreshSecret,
        expiresIn: this.refreshExpiresIn as any
      })
    ]);

    return {
      accessToken,
      refreshToken
    };
  }

  private getCookieOptions(maxAgeMs: number): CookieOptions {
    const isProduction = this.configService.get<string>("NODE_ENV") === "production";
    const sameSite =
      (this.configService.get<string>("COOKIE_SAME_SITE") as "lax" | "strict" | "none") || "lax";

    return {
      httpOnly: true,
      secure: isProduction,
      sameSite,
      path: "/",
      maxAge: maxAgeMs
    };
  }

  setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    // 15 minutes for access token
    const accessMaxAge = 15 * 60 * 1000;
    // 7 days for refresh token
    const refreshMaxAge = 7 * 24 * 60 * 60 * 1000;

    res.cookie("accessToken", accessToken, this.getCookieOptions(accessMaxAge));
    res.cookie("refreshToken", refreshToken, this.getCookieOptions(refreshMaxAge));
  }

  clearAuthCookies(res: Response) {
    const isProduction = this.configService.get<string>("NODE_ENV") === "production";
    const sameSite =
      (this.configService.get<string>("COOKIE_SAME_SITE") as "lax" | "strict" | "none") || "lax";

    const clearOptions: CookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite,
      path: "/",
      expires: new Date(0),
      maxAge: 0
    };

    res.clearCookie("accessToken", clearOptions);
    res.clearCookie("refreshToken", clearOptions);
  }
}
