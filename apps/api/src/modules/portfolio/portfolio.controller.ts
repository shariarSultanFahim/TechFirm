import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PortfolioService } from "./portfolio.service";
import {
  CreatePortfolioItemDto,
  QueryPortfolioItemsDto,
  UpdatePortfolioItemDto
} from "./dto/portfolio.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "@repo/types";

@ApiTags("Portfolio")
@Controller("portfolio")
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @ApiOperation({ summary: "Get all portfolio items (public with optional filters)" })
  async findAll(@Query() query: QueryPortfolioItemsDto) {
    const { items, meta } = await this.portfolioService.findAll(query);
    return {
      success: true,
      message: "Portfolio items retrieved successfully",
      data: items,
      meta
    };
  }

  @Get("categories")
  @ApiOperation({ summary: "Get list of active portfolio categories" })
  async getCategories() {
    const categories = await this.portfolioService.getCategories();
    return {
      success: true,
      message: "Portfolio categories retrieved successfully",
      data: categories
    };
  }

  @Get("slug/:slug")
  @ApiOperation({ summary: "Get portfolio item by slug" })
  async findBySlug(@Param("slug") slug: string) {
    const item = await this.portfolioService.findBySlug(slug);
    return {
      success: true,
      message: "Portfolio item retrieved successfully",
      data: item
    };
  }

  @Get("id/:id")
  @ApiOperation({ summary: "Get portfolio item by ID" })
  async findById(@Param("id") id: string) {
    const item = await this.portfolioService.findById(id);
    return {
      success: true,
      message: "Portfolio item retrieved successfully",
      data: item
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create new portfolio item (Admin only)" })
  async create(@Body() dto: CreatePortfolioItemDto) {
    const item = await this.portfolioService.create(dto);
    return {
      success: true,
      message: "Portfolio item created successfully",
      data: item
    };
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update portfolio item (Admin only)" })
  async update(@Param("id") id: string, @Body() dto: UpdatePortfolioItemDto) {
    const item = await this.portfolioService.update(id, dto);
    return {
      success: true,
      message: "Portfolio item updated successfully",
      data: item
    };
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete portfolio item (Admin only)" })
  async remove(@Param("id") id: string) {
    const result = await this.portfolioService.remove(id);
    return {
      success: true,
      message: "Portfolio item deleted successfully",
      data: result
    };
  }
}
