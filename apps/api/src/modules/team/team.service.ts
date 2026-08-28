import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TeamMember, TeamMemberDocument } from "./schemas/team-member.schema";
import {
  CreateTeamMemberDto,
  UpdateTeamMemberDto,
  QueryTeamMembersDto
} from "./dto/team-member.dto";

function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(TeamMember.name)
    private readonly teamMemberModel: Model<TeamMemberDocument>
  ) {}

  private async getUniqueSlug(baseSlug: string, currentId?: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.teamMemberModel.findOne({ slug }).exec();
      if (!existing || (currentId && existing._id.toString() === currentId)) {
        return slug;
      }
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  async findAll(query?: QueryTeamMembersDto) {
    const filter: Record<string, any> = {};

    if (query?.isActive !== undefined) {
      filter.isActive = query.isActive === "true";
    }

    if (query?.search) {
      const searchRegex = new RegExp(query.search, "i");
      filter.$or = [
        { name: searchRegex },
        { role: searchRegex },
        { bio: searchRegex },
        { skills: searchRegex }
      ];
    }

    const total = await this.teamMemberModel.countDocuments(filter).exec();

    if (query?.page || query?.limit) {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const skip = (page - 1) * limit;

      const items = await this.teamMemberModel
        .find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();

      return {
        items: items.map((m) => (m.toJSON ? m.toJSON() : m)),
        data: items.map((m) => (m.toJSON ? m.toJSON() : m)),
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    }

    const items = await this.teamMemberModel.find(filter).sort({ order: 1, createdAt: -1 }).exec();
    return items.map((m) => (m.toJSON ? m.toJSON() : m));
  }

  async findBySlug(slug: string): Promise<TeamMember> {
    const member = await this.teamMemberModel.findOne({ slug }).exec();
    if (!member) {
      throw new NotFoundException(`Team member with slug "${slug}" not found`);
    }
    return member;
  }

  async findById(id: string): Promise<TeamMember> {
    const member = await this.teamMemberModel.findById(id).exec();
    if (!member) {
      throw new NotFoundException(`Team member with ID "${id}" not found`);
    }
    return member;
  }

  async create(createDto: CreateTeamMemberDto): Promise<TeamMember> {
    const baseSlug = generateSlug(createDto.name);
    const slug = await this.getUniqueSlug(baseSlug);

    const created = new this.teamMemberModel({
      ...createDto,
      slug
    });

    return created.save();
  }

  async update(id: string, updateDto: UpdateTeamMemberDto): Promise<TeamMember> {
    const existing = await this.teamMemberModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Team member with ID "${id}" not found`);
    }

    let slug = existing.slug;
    if (updateDto.name && updateDto.name !== existing.name) {
      const baseSlug = generateSlug(updateDto.name);
      slug = await this.getUniqueSlug(baseSlug, id);
    }

    const updated = await this.teamMemberModel
      .findByIdAndUpdate(id, { $set: { ...updateDto, slug } }, { new: true, runValidators: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Team member with ID "${id}" not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<{ success: boolean; id: string }> {
    const deleted = await this.teamMemberModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Team member with ID "${id}" not found`);
    }

    return { success: true, id };
  }
}
