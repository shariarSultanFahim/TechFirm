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

  async findAll(query?: QueryFaqsDto): Promise<Faq[]> {
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

    const q = this.faqModel.find(filter).sort({ order: 1, createdAt: -1 });

    if (query?.limit) {
      q.limit(Number(query.limit));
    }

    if (query?.page && query?.limit) {
      q.skip((Number(query.page) - 1) * Number(query.limit));
    }

    return q.exec();
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
