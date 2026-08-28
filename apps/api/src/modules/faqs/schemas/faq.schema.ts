import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IFaq } from "@repo/types";

export type FaqDocument = HydratedDocument<Faq>;

@Schema({ timestamps: true, collection: "faqs" })
export class Faq implements IFaq {
  @Prop({ required: true, trim: true })
  question: string;

  @Prop({ required: true, trim: true })
  answer: string;

  @Prop({ required: true, default: "General", trim: true })
  category: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);

FaqSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret: any) => {
    ret.id = ret._id?.toString?.() || ret._id;
    delete ret._id;
  }
});
