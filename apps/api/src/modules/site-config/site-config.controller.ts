import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { UserRole } from "@repo/types";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { UpdateSiteConfigDto } from "./dto/site-config.dto";
import { SiteConfigService } from "./site-config.service";

@ApiTags("Site Configuration")
@Controller("site-config")
export class SiteConfigController {
  constructor(private readonly siteConfigService: SiteConfigService) {}

  @Get()
  @ApiOperation({ summary: "Get site configuration (Public)" })
  @SwaggerApiResponse({ status: 200, description: "Site configuration details" })
  async getConfig() {
    const config = await this.siteConfigService.getConfig();
    return {
      message: "Site configuration retrieved successfully",
      data: config.toJSON()
    };
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Update site configuration (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "Site configuration updated successfully" })
  async updateConfig(@Body() updateDto: UpdateSiteConfigDto) {
    const config = await this.siteConfigService.updateConfig(updateDto);
    return {
      message: "Site configuration updated successfully",
      data: config.toJSON()
    };
  }
}
