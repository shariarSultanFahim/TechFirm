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
import { CreatePlanDto, QueryPlanDto, UpdatePlanDto } from "./dto/plan.dto";
import { PlansService } from "./plans.service";

@ApiTags("Plans")
@Controller("plans")
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @ApiOperation({ summary: "Get all plans (Public)" })
  @SwaggerApiResponse({ status: 200, description: "List of plans" })
  async findAll(@Query() query: QueryPlanDto) {
    const plans = await this.plansService.findAll(query);
    return {
      message: "Plans retrieved successfully",
      data: plans.map((p) => p.toJSON())
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get plan by ID (Public)" })
  @SwaggerApiResponse({ status: 200, description: "Plan details" })
  async findOne(@Param("id") id: string) {
    const plan = await this.plansService.findById(id);
    return {
      message: "Plan retrieved successfully",
      data: plan.toJSON()
    };
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Create a new plan (Admin only)" })
  @SwaggerApiResponse({ status: 201, description: "Plan created successfully" })
  async create(@Body() createPlanDto: CreatePlanDto) {
    const created = await this.plansService.create(createPlanDto);
    return {
      message: "Plan created successfully",
      data: created.toJSON()
    };
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Update plan by ID (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "Plan updated successfully" })
  async update(@Param("id") id: string, @Body() updatePlanDto: UpdatePlanDto) {
    const updated = await this.plansService.update(id, updatePlanDto);
    return {
      message: "Plan updated successfully",
      data: updated.toJSON()
    };
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Delete plan by ID (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "Plan deleted successfully" })
  async remove(@Param("id") id: string) {
    const result = await this.plansService.remove(id);
    return {
      message: "Plan deleted successfully",
      data: result
    };
  }
}
