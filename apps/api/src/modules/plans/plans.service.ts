import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePlanDto, QueryPlanDto, UpdatePlanDto } from "./dto/plan.dto";
import { Plan, PlanDocument } from "./schemas/plan.schema";

@Injectable()
export class PlansService {
  constructor(
    @InjectModel(Plan.name)
    private readonly planModel: Model<PlanDocument>
  ) {}

  async findAll(query?: QueryPlanDto) {
    const filter: Record<string, any> = {};
    if (query?.billingPeriod) {
      filter.billingPeriod = query.billingPeriod;
    }
    if (query?.isActive !== undefined) {
      filter.isActive = query.isActive;
    }
    if (query?.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { description: { $regex: query.search, $options: "i" } }
      ];
    }

    const total = await this.planModel.countDocuments(filter).exec();

    if (query?.page || query?.limit) {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const skip = (page - 1) * limit;

      const items = await this.planModel
        .find(filter)
        .sort({ order: 1, createdAt: 1 })
        .skip(skip)
        .limit(limit)
        .exec();

      return {
        items: items.map((p) => p.toJSON()),
        data: items.map((p) => p.toJSON()),
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    }

    const items = await this.planModel.find(filter).sort({ order: 1, createdAt: 1 }).exec();
    return items.map((p) => p.toJSON());
  }

  async findById(id: string): Promise<PlanDocument> {
    const plan = await this.planModel.findById(id).exec();
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
    return plan;
  }

  async create(createPlanDto: CreatePlanDto): Promise<PlanDocument> {
    const createdPlan = new this.planModel(createPlanDto);
    return createdPlan.save();
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<PlanDocument> {
    const updatedPlan = await this.planModel
      .findByIdAndUpdate(id, { $set: updatePlanDto }, { new: true })
      .exec();
    if (!updatedPlan) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
    return updatedPlan;
  }

  async remove(id: string): Promise<{ deleted: boolean; id: string }> {
    const result = await this.planModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
    return { deleted: true, id };
  }
}
