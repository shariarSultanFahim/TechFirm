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
import { ContactMessagesService } from "./contact-messages.service";
import {
  CreateContactMessageDto,
  QueryContactMessageDto,
  UpdateContactMessageDto
} from "./dto/contact-message.dto";

@ApiTags("Contact Messages")
@Controller("contact-messages")
export class ContactMessagesController {
  constructor(
    private readonly messagesService: ContactMessagesService
  ) {}

  @Post()
  @ApiOperation({ summary: "Submit a new contact message (Public)" })
  @SwaggerApiResponse({ status: 201, description: "Message submitted successfully" })
  async create(@Body() createDto: CreateContactMessageDto) {
    const created = await this.messagesService.create(createDto);
    return {
      message: "Your message has been sent successfully. We will get back to you shortly!",
      data: created.toJSON()
    };
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Get all contact messages (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "Paginated list of messages" })
  async findAll(@Query() query: QueryContactMessageDto) {
    const result = await this.messagesService.findAll(query);
    return {
      message: "Contact messages retrieved successfully",
      data: result.items,
      meta: result.meta
    };
  }

  @Get("unread-count")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Get unread message count (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "Unread count" })
  async getUnreadCount() {
    const count = await this.messagesService.countUnread();
    return {
      message: "Unread count retrieved successfully",
      data: { count }
    };
  }

  @Get(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Get message by ID (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "Message details" })
  async findOne(@Param("id") id: string) {
    const msg = await this.messagesService.findById(id);
    return {
      message: "Message retrieved successfully",
      data: msg.toJSON()
    };
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Update message status / mark read (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "Message updated successfully" })
  async update(
    @Param("id") id: string,
    @Body() updateDto: UpdateContactMessageDto
  ) {
    const updated = await this.messagesService.update(id, updateDto);
    return {
      message: "Message updated successfully",
      data: updated.toJSON()
    };
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Delete message by ID (Admin only)" })
  @SwaggerApiResponse({ status: 200, description: "Message deleted successfully" })
  async remove(@Param("id") id: string) {
    const result = await this.messagesService.remove(id);
    return {
      message: "Message deleted successfully",
      data: result
    };
  }
}
