import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BillingPeriod } from "@repo/types";

export type PlanDocument = HydratedDocument<Plan>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_, ret: Record<string, any>) => {
      if (ret._id) {
        ret.id = ret._id.toString();
      }
      delete ret._id;
      return ret;
    }
  }
})
export class Plan {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({
    required: true,
    type: String,
    enum: ["monthly", "annual"],
    default: "monthly",
    index: true
  })
  billingPeriod: BillingPeriod;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ default: false, index: true })
  isPopular: boolean;

  @Prop({ default: true, index: true })
  isActive: boolean;

  @Prop({ default: 0 })
  order: number;

  @Prop({ trim: true })
  description?: string;

  @Prop({ default: "Get Started", trim: true })
  buttonText?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
