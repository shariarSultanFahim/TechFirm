import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { QueryUserDto } from "./dto/query-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Get all users (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "List of users with pagination" })
  async findAll(@Query() query: QueryUserDto) {
    const res = await this.usersService.findAll(query);
    return {
      success: true,
      message: "Users retrieved successfully",
      data: res.data,
      meta: res.meta
    };
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Create user account (Admin only)" })
  @SwaggerApiResponse({ status: 201, description: "User created successfully" })
  async create(@Body() createUserDto: any) {
    const user = await this.usersService.create(createUserDto);
    return {
      success: true,
      message: "User created successfully",
      data: user.toJSON()
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID (Admin or Account Owner)" })
  @SwaggerApiResponse({ status: 200, description: "User details" })
  async findOne(@Param("id") id: string, @CurrentUser() currentUser: any) {
    if (currentUser.role !== UserRole.ADMIN && currentUser.sub !== id && currentUser.id !== id) {
      throw new ForbiddenException("You are not authorized to view another user's profile");
    }
    const user = await this.usersService.findById(id);
    return {
      message: "User retrieved successfully",
      data: user.toJSON()
    };
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user (Admin or Account Owner)" })
  @SwaggerApiResponse({ status: 200, description: "Updated user details" })
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: any
  ) {
    const isSelf = currentUser.sub === id || currentUser.id === id;
    const isAdmin = currentUser.role === UserRole.ADMIN;

    if (!isAdmin && !isSelf) {
      throw new ForbiddenException("You are not authorized to update this user");
    }

    // Only admin can promote / change roles
    if (updateUserDto.role && !isAdmin) {
      throw new ForbiddenException("Only administrators can modify user roles");
    }

    const updated = await this.usersService.update(id, updateUserDto);
    return {
      message: "User updated successfully",
      data: updated.toJSON()
    };
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Delete user by ID (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "User deleted successfully" })
  async remove(@Param("id") id: string) {
    const result = await this.usersService.remove(id);
    return {
      message: "User deleted successfully",
      data: result
    };
  }
}
