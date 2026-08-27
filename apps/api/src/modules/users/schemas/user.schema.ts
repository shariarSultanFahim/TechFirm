import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserRole } from "@repo/types";

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_, ret: Record<string, any>) => {
      if (ret._id) {
        ret.id = ret._id.toString();
      }
      delete ret._id;
      delete ret.password;
      delete ret.refreshToken;
      return ret;
    }
  }
})
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
    index: true
  })
  role: UserRole;

  @Prop({ select: false })
  refreshToken?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
