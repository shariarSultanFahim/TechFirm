import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Faq, FaqDocument } from "./schemas/faq.schema";
import { CreateFaqDto, UpdateFaqDto, QueryFaqsDto } from "./dto/faq.dto";

@Injectable()
export class FaqsService {
  constructor(
    @InjectModel(Faq.name)
    private readonly faqModel: Model<FaqDocument>
  ) {}

  async findAll(query?: QueryFaqsDto) {
    const filter: Record<string, any> = {};

    if (query?.isActive !== undefined) {
      filter.isActive = query.isActive === "true";
    }

    if (query?.category && query.category !== "All") {
      filter.category = query.category;
    }

    if (query?.search) {
      const searchRegex = new RegExp(query.search, "i");
      filter.$or = [{ question: searchRegex }, { answer: searchRegex }];
    }

    const total = await this.faqModel.countDocuments(filter).exec();

    if (query?.page || query?.limit) {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const skip = (page - 1) * limit;

      const items = await this.faqModel
        .find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();

      return {
        items: items.map((f) => (f.toJSON ? f.toJSON() : f)),
        data: items.map((f) => (f.toJSON ? f.toJSON() : f)),
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    }

    const items = await this.faqModel.find(filter).sort({ order: 1, createdAt: -1 }).exec();
    return items.map((f) => (f.toJSON ? f.toJSON() : f));
  }

  async getCategories(): Promise<string[]> {
    const categories = await this.faqModel.distinct("category").exec();
    return categories.filter(Boolean);
  }

  async findById(id: string): Promise<Faq> {
    const faq = await this.faqModel.findById(id).exec();
    if (!faq) {
      throw new NotFoundException(`FAQ with ID "${id}" not found`);
    }
    return faq;
  }

  async create(createDto: CreateFaqDto): Promise<Faq> {
    const created = new this.faqModel(createDto);
    return created.save();
  }

  async update(id: string, updateDto: UpdateFaqDto): Promise<Faq> {
    const updated = await this.faqModel
      .findByIdAndUpdate(id, { $set: updateDto }, { new: true, runValidators: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`FAQ with ID "${id}" not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<{ success: boolean; id: string }> {
    const deleted = await this.faqModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`FAQ with ID "${id}" not found`);
    }

    return { success: true, id };
  }
}
