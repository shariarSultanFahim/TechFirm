import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ContactMessageDocument = HydratedDocument<ContactMessage>;

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
export class ContactMessage {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, lowercase: true, trim: true, index: true })
  email: string;

  @Prop({ trim: true })
  subject?: string;

  @Prop({ required: true, trim: true })
  message: string;

  @Prop({ default: false, index: true })
  isRead: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const ContactMessageSchema = SchemaFactory.createForClass(ContactMessage);
