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
import { TestimonialsService } from "./testimonials.service";
import {
  CreateTestimonialDto,
  UpdateTestimonialDto,
  QueryTestimonialsDto
} from "./dto/testimonial.dto";

@ApiTags("testimonials")
@Controller("testimonials")
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: "Get all testimonials (Public, filterable by active/limit)" })
  @ApiResponse({ status: 200, description: "Returns list of testimonials" })
  async findAll(@Query() query: QueryTestimonialsDto) {
    const res = await this.testimonialsService.findAll(query);
    if (res && typeof res === "object" && "items" in res) {
      return {
        message: "Testimonials retrieved successfully",
        data: res.items,
        meta: res.meta
      };
    }
    return {
      message: "Testimonials retrieved successfully",
      data: res
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get testimonial by ID (Public)" })
  @ApiResponse({ status: 200, description: "Returns testimonial document" })
  @ApiResponse({ status: 404, description: "Testimonial not found" })
  async findById(@Param("id") id: string) {
    return this.testimonialsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new testimonial (Admin only)" })
  @ApiResponse({ status: 201, description: "Testimonial created successfully" })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update testimonial by ID (Admin only)" })
  @ApiResponse({ status: 200, description: "Testimonial updated successfully" })
  @ApiResponse({ status: 404, description: "Testimonial not found" })
  async update(@Param("id") id: string, @Body() updateDto: UpdateTestimonialDto) {
    return this.testimonialsService.update(id, updateDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete testimonial by ID (Admin only)" })
  @ApiResponse({ status: 200, description: "Testimonial deleted successfully" })
  @ApiResponse({ status: 404, description: "Testimonial not found" })
  async remove(@Param("id") id: string) {
    return this.testimonialsService.remove(id);
  }
}
