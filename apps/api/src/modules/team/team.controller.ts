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
import { TeamService } from "./team.service";
import {
  CreateTeamMemberDto,
  UpdateTeamMemberDto,
  QueryTeamMembersDto
} from "./dto/team-member.dto";

@ApiTags("team")
@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiOperation({ summary: "Get all team members (Public, filterable by search/active)" })
  @ApiResponse({ status: 200, description: "Returns list of team members" })
  async findAll(@Query() query: QueryTeamMembersDto) {
    return this.teamService.findAll(query);
  }

  @Get(":slug")
  @ApiOperation({ summary: "Get team member by unique slug (Public)" })
  @ApiResponse({ status: 200, description: "Returns team member details" })
  @ApiResponse({ status: 404, description: "Team member not found" })
  async findBySlug(@Param("slug") slug: string) {
    return this.teamService.findBySlug(slug);
  }

  @Get("id/:id")
  @ApiOperation({ summary: "Get team member by ID (Public)" })
  @ApiResponse({ status: 200, description: "Returns team member details" })
  @ApiResponse({ status: 404, description: "Team member not found" })
  async findById(@Param("id") id: string) {
    return this.teamService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create new team member with auto-slug (Admin only)" })
  @ApiResponse({ status: 201, description: "Team member created successfully" })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateTeamMemberDto) {
    return this.teamService.create(createDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update team member by ID (Admin only)" })
  @ApiResponse({ status: 200, description: "Team member updated successfully" })
  @ApiResponse({ status: 404, description: "Team member not found" })
  async update(@Param("id") id: string, @Body() updateDto: UpdateTeamMemberDto) {
    return this.teamService.update(id, updateDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete team member by ID (Admin only)" })
  @ApiResponse({ status: 200, description: "Team member deleted successfully" })
  @ApiResponse({ status: 404, description: "Team member not found" })
  async remove(@Param("id") id: string) {
    return this.teamService.remove(id);
  }
}
