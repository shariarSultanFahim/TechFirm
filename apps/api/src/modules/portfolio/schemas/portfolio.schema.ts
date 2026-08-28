import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IPortfolioItem, IPortfolioResult } from "@repo/types";

export type PortfolioDocument = HydratedDocument<PortfolioItem>;

@Schema({ _id: false })
export class PortfolioResult implements IPortfolioResult {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;
}

export const PortfolioResultSchema = SchemaFactory.createForClass(PortfolioResult);

@Schema({ timestamps: true, collection: "portfolio_items" })
export class PortfolioItem implements IPortfolioItem {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ default: "", trim: true })
  subtitle?: string;

  @Prop({ required: true, trim: true, default: "Technology" })
  category: string;

  @Prop({ default: "", trim: true })
  industry?: string;

  @Prop({ default: "", trim: true })
  overview?: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: "" })
  bgImage?: string;

  @Prop({ default: false })
  isDark?: boolean;

  @Prop({ default: "View Project", trim: true })
  actionText?: string;

  @Prop({ type: [String], default: [] })
  challengeText?: string[];

  @Prop({ type: [String], default: [] })
  solutionText?: string[];

  @Prop({ type: [PortfolioResultSchema], default: [] })
  results?: PortfolioResult[];

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const PortfolioSchema = SchemaFactory.createForClass(PortfolioItem);

PortfolioSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret: any) => {
    ret.id = ret._id?.toString?.() || ret._id;
    delete ret._id;
  }
});
