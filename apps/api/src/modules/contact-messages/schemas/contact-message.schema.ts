import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IContactMessage, ContactMessageStatus } from "@repo/types";

export type ContactMessageDocument = HydratedDocument<ContactMessage>;

@Schema({
  timestamps: true,
  versionKey: false,
  collection: "contact_messages",
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
export class ContactMessage implements IContactMessage {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, lowercase: true, trim: true, index: true })
  email: string;

  @Prop({ default: "", trim: true })
  phone?: string;

  @Prop({ default: "", trim: true })
  subject?: string;

  @Prop({ default: "", trim: true })
  service?: string;

  @Prop({ required: true, trim: true })
  message: string;

  @Prop({ default: false, index: true })
  isRead: boolean;

  @Prop({
    type: String,
    enum: ["unread", "read", "replied", "archived"],
    default: "unread",
    index: true
  })
  status?: ContactMessageStatus;

  @Prop({ default: "", trim: true })
  replyNotes?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const ContactMessageSchema = SchemaFactory.createForClass(ContactMessage);
