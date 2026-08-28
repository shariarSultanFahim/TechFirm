import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ITestimonial } from "@repo/types";

export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema({ timestamps: true, collection: "testimonials" })
export class Testimonial implements ITestimonial {
  @Prop({ required: true, trim: true })
  quote: string;

  @Prop({ required: true, trim: true })
  authorName: string;

  @Prop({ required: true, trim: true })
  authorRole: string;

  @Prop({ default: "" })
  company: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ default: 5, min: 1, max: 5 })
  rating: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: false })
  hasVideo: boolean;

  @Prop({ default: "" })
  videoUrl: string;

  @Prop({ default: "" })
  posterImage: string;

  @Prop({ default: "bg-linear-to-br from-[#00C0FA] to-[#007BFE]" })
  iconBg: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);

TestimonialSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret: any) => {
    ret.id = ret._id?.toString?.() || ret._id;
    delete ret._id;
  }
});
