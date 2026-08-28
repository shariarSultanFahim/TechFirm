import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CreateContactMessageDto,
  QueryContactMessageDto,
  UpdateContactMessageDto
} from "./dto/contact-message.dto";
import { ContactMessage, ContactMessageDocument } from "./schemas/contact-message.schema";

@Injectable()
export class ContactMessagesService {
  constructor(
    @InjectModel(ContactMessage.name)
    private readonly messageModel: Model<ContactMessageDocument>
  ) {}

  async findAll(query?: QueryContactMessageDto) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 50;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (query?.isRead !== undefined && query.isRead !== "All") {
      filter.isRead = query.isRead === "true";
    }

    if (query?.status && query.status !== "All") {
      filter.status = query.status;
    }

    if (query?.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
        { phone: { $regex: query.search, $options: "i" } },
        { subject: { $regex: query.search, $options: "i" } },
        { service: { $regex: query.search, $options: "i" } },
        { message: { $regex: query.search, $options: "i" } }
      ];
    }

    const [items, total] = await Promise.all([
      this.messageModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.messageModel.countDocuments(filter).exec()
    ]);

    return {
      items: items.map((i) => i.toJSON()),
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit)
      }
    };
  }

  async countUnread(): Promise<number> {
    return this.messageModel.countDocuments({ isRead: false }).exec();
  }

  async findById(id: string): Promise<ContactMessageDocument> {
    const message = await this.messageModel.findById(id).exec();
    if (!message) {
      throw new NotFoundException(`Message with ID "${id}" not found`);
    }
    return message;
  }

  async create(createDto: CreateContactMessageDto): Promise<ContactMessageDocument> {
    const created = new this.messageModel({
      ...createDto,
      status: "unread",
      isRead: false
    });
    return created.save();
  }

  async update(id: string, updateDto: UpdateContactMessageDto): Promise<ContactMessageDocument> {
    // If marking as read, sync status if currently unread
    const updates: Partial<ContactMessage> = { ...updateDto };
    if (updateDto.isRead === true && !updateDto.status) {
      updates.status = "read";
    }

    const updated = await this.messageModel
      .findByIdAndUpdate(id, { $set: updates }, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Message with ID "${id}" not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean; id: string }> {
    const result = await this.messageModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Message with ID "${id}" not found`);
    }
    return { deleted: true, id };
  }
}
