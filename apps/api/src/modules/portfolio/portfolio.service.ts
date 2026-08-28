import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PortfolioDocument, PortfolioItem } from "./schemas/portfolio.schema";
import {
  CreatePortfolioItemDto,
  QueryPortfolioItemsDto,
  UpdatePortfolioItemDto
} from "./dto/portfolio.dto";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(PortfolioItem.name)
    private portfolioModel: Model<PortfolioDocument>
  ) {}

  private async generateUniqueSlug(title: string, currentId?: string): Promise<string> {
    const baseSlug = slugify(title) || "case-study";
    let candidate = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.portfolioModel.findOne({ slug: candidate });
      if (!existing || (currentId && existing._id.toString() === currentId)) {
        return candidate;
      }
      counter += 1;
      candidate = `${baseSlug}-${counter}`;
    }
  }

  async findAll(query: QueryPortfolioItemsDto) {
    const filter: Record<string, any> = {};

    if (query.isActive !== undefined) {
      filter.isActive = query.isActive === "true";
    }

    if (query.category && query.category !== "All") {
      filter.category = query.category;
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: "i" } },
        { subtitle: { $regex: query.search, $options: "i" } },
        { industry: { $regex: query.search, $options: "i" } },
        { overview: { $regex: query.search, $options: "i" } }
      ];
    }

    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 50;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.portfolioModel
        .find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.portfolioModel.countDocuments(filter).exec()
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getCategories(): Promise<string[]> {
    const distinct = await this.portfolioModel.distinct("category", { isActive: true });
    return (distinct as string[]).filter(Boolean);
  }

  async findBySlug(slug: string): Promise<PortfolioDocument> {
    const item = await this.portfolioModel.findOne({ slug }).exec();
    if (!item) {
      throw new NotFoundException(`Portfolio item with slug '${slug}' not found`);
    }
    return item;
  }

  async findById(id: string): Promise<PortfolioDocument> {
    const item = await this.portfolioModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Portfolio item with ID '${id}' not found`);
    }
    return item;
  }

  async create(dto: CreatePortfolioItemDto): Promise<PortfolioDocument> {
    const slug = await this.generateUniqueSlug(dto.title);
    const item = new this.portfolioModel({
      ...dto,
      slug
    });
    return item.save();
  }

  async update(id: string, dto: UpdatePortfolioItemDto): Promise<PortfolioDocument> {
    const item = await this.findById(id);

    if (dto.title && dto.title !== item.title) {
      item.slug = await this.generateUniqueSlug(dto.title, id);
    }

    Object.assign(item, dto);
    return item.save();
  }

  async remove(id: string): Promise<{ deleted: boolean; id: string }> {
    const result = await this.portfolioModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Portfolio item with ID '${id}' not found`);
    }
    return { deleted: true, id };
  }
}
