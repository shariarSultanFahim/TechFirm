import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Testimonial, TestimonialDocument } from "./schemas/testimonial.schema";
import {
  CreateTestimonialDto,
  UpdateTestimonialDto,
  QueryTestimonialsDto
} from "./dto/testimonial.dto";

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name)
    private readonly testimonialModel: Model<TestimonialDocument>
  ) {}

  async findAll(query?: QueryTestimonialsDto): Promise<Testimonial[]> {
    const filter: Record<string, any> = {};

    if (query?.isActive !== undefined) {
      filter.isActive = query.isActive === "true";
    }

    const q = this.testimonialModel.find(filter).sort({ order: 1, createdAt: -1 });

    if (query?.limit) {
      q.limit(Number(query.limit));
    }

    if (query?.page && query?.limit) {
      q.skip((Number(query.page) - 1) * Number(query.limit));
    }

    return q.exec();
  }

  async findById(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialModel.findById(id).exec();
    if (!testimonial) {
      throw new NotFoundException(`Testimonial with ID "${id}" not found`);
    }
    return testimonial;
  }

  async create(createDto: CreateTestimonialDto): Promise<Testimonial> {
    const created = new this.testimonialModel(createDto);
    return created.save();
  }

  async update(id: string, updateDto: UpdateTestimonialDto): Promise<Testimonial> {
    const updated = await this.testimonialModel
      .findByIdAndUpdate(id, { $set: updateDto }, { new: true, runValidators: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Testimonial with ID "${id}" not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<{ success: boolean; id: string }> {
    const deleted = await this.testimonialModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Testimonial with ID "${id}" not found`);
    }

    return { success: true, id };
  }
}
