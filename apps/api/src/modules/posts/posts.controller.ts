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
import { CreatePostDto, QueryPostDto, UpdatePostDto } from "./dto/post.dto";
import { PostsService } from "./posts.service";

@ApiTags("Posts")
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: "Get all blog posts (Public)" })
  @SwaggerApiResponse({ status: 200, description: "Paginated list of posts" })
  async findAll(@Query() query: QueryPostDto) {
    const result = await this.postsService.findAll(query);
    return {
      message: "Posts retrieved successfully",
      data: result.items,
      meta: result.meta
    };
  }

  @Get("categories")
  @ApiOperation({ summary: "Get distinct blog categories (Public)" })
  @SwaggerApiResponse({ status: 200, description: "List of categories" })
  async getCategories() {
    const categories = await this.postsService.getCategories();
    return {
      message: "Categories retrieved successfully",
      data: categories
    };
  }

  @Get("slug/:slug")
  @ApiOperation({ summary: "Get blog post by slug (Public)" })
  @SwaggerApiResponse({ status: 200, description: "Post details" })
  async findBySlug(@Param("slug") slug: string) {
    const post = await this.postsService.findBySlug(slug);
    return {
      message: "Post retrieved successfully",
      data: post.toJSON()
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get blog post by ID (Public)" })
  @SwaggerApiResponse({ status: 200, description: "Post details" })
  async findOne(@Param("id") id: string) {
    const post = await this.postsService.findById(id);
    return {
      message: "Post retrieved successfully",
      data: post.toJSON()
    };
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Create a new blog post (Admin only)" })
  @SwaggerApiResponse({ status: 201, description: "Post created successfully" })
  async create(@Body() createPostDto: CreatePostDto) {
    const created = await this.postsService.create(createPostDto);
    return {
      message: "Post created successfully",
      data: created.toJSON()
    };
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Update blog post by ID (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "Post updated successfully" })
  async update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    const updated = await this.postsService.update(id, updatePostDto);
    return {
      message: "Post updated successfully",
      data: updated.toJSON()
    };
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Delete blog post by ID (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "Post deleted successfully" })
  async remove(@Param("id") id: string) {
    const result = await this.postsService.remove(id);
    return {
      message: "Post deleted successfully",
      data: result
    };
  }
}
