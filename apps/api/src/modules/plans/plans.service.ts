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

  async findAll(query?: QueryPlanDto): Promise<PlanDocument[]> {
    const filter: Record<string, any> = {};
    if (query?.billingPeriod) {
      filter.billingPeriod = query.billingPeriod;
    }
    if (query?.isActive !== undefined) {
      filter.isActive = query.isActive;
    }

    return this.planModel.find(filter).sort({ order: 1, createdAt: 1 }).exec();
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
