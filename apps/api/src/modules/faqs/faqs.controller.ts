import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { FaqsService } from "./faqs.service";
import { CreateFaqDto, UpdateFaqDto, QueryFaqsDto } from "./dto/faq.dto";

@ApiTags("faqs")
@Controller("faqs")
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  @ApiOperation({ summary: "Get all FAQs (Public, supports category filter, search, active flag)" })
  @ApiResponse({ status: 200, description: "Returns list of FAQs" })
  async findAll(@Query() query: QueryFaqsDto) {
    return this.faqsService.findAll(query);
  }

  @Get("categories")
  @ApiOperation({ summary: "Get distinct FAQ categories (Public)" })
  @ApiResponse({ status: 200, description: "Returns array of category strings" })
  async getCategories() {
    return this.faqsService.getCategories();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get FAQ by ID (Public)" })
  @ApiResponse({ status: 200, description: "Returns FAQ document" })
  @ApiResponse({ status: 404, description: "FAQ not found" })
  async findById(@Param("id") id: string) {
    return this.faqsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new FAQ (Admin only)" })
  @ApiResponse({ status: 201, description: "FAQ created successfully" })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateFaqDto) {
    return this.faqsService.create(createDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update FAQ by ID (Admin only)" })
  @ApiResponse({ status: 200, description: "FAQ updated successfully" })
  @ApiResponse({ status: 404, description: "FAQ not found" })
  async update(@Param("id") id: string, @Body() updateDto: UpdateFaqDto) {
    return this.faqsService.update(id, updateDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete FAQ by ID (Admin only)" })
  @ApiResponse({ status: 200, description: "FAQ deleted successfully" })
  @ApiResponse({ status: 404, description: "FAQ not found" })
  async remove(@Param("id") id: string) {
    return this.faqsService.remove(id);
  }
}
