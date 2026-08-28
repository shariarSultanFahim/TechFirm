import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePostDto, QueryPostDto, UpdatePostDto } from "./dto/post.dto";
import { Post, PostDocument } from "./schemas/post.schema";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>
  ) {}

  async findAll(query?: QueryPostDto) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (query?.category) {
      filter.category = new RegExp(`^${query.category}$`, "i");
    }

    if (query?.isPublished !== undefined) {
      filter.isPublished = query.isPublished;
    }

    if (query?.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: "i" } },
        { excerpt: { $regex: query.search, $options: "i" } },
        { tags: { $in: [new RegExp(query.search, "i")] } }
      ];
    }

    const [items, total] = await Promise.all([
      this.postModel
        .find(filter)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.postModel.countDocuments(filter).exec()
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

  async getCategories(): Promise<string[]> {
    const categories = await this.postModel.distinct("category").exec();
    return categories.filter(Boolean);
  }

  async findBySlug(slug: string): Promise<PostDocument> {
    const post = await this.postModel.findOne({ slug }).exec();
    if (!post) {
      throw new NotFoundException(`Article with slug "${slug}" not found`);
    }
    return post;
  }

  async findById(id: string): Promise<PostDocument> {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }
    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    const slug = createPostDto.slug || slugify(createPostDto.title);
    const existing = await this.postModel.findOne({ slug }).exec();
    if (existing) {
      throw new BadRequestException(`An article with slug "${slug}" already exists`);
    }

    const createdPost = new this.postModel({
      ...createPostDto,
      slug,
      publishedAt: createPostDto.publishedAt || new Date()
    });
    return createdPost.save();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostDocument> {
    if (updatePostDto.slug) {
      const existing = await this.postModel
        .findOne({ slug: updatePostDto.slug, _id: { $ne: id } })
        .exec();
      if (existing) {
        throw new BadRequestException(
          `An article with slug "${updatePostDto.slug}" already exists`
        );
      }
    }

    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, { $set: updatePostDto }, { new: true })
      .exec();
    if (!updatedPost) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }
    return updatedPost;
  }

  async remove(id: string): Promise<{ deleted: boolean; id: string }> {
    const result = await this.postModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }
    return { deleted: true, id };
  }
}
