import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ITeamMember, ISocialLinks } from "@repo/types";
import { SocialLinks } from "../../site-config/schemas/site-config.schema";

export type TeamMemberDocument = HydratedDocument<TeamMember>;

@Schema({ timestamps: true, collection: "team_members" })
export class TeamMember implements ITeamMember {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  slug: string;

  @Prop({ required: true, trim: true })
  role: string;

  @Prop({ default: "" })
  bio: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ default: "" })
  email: string;

  @Prop({ default: "" })
  phone: string;

  @Prop({ type: SocialLinks, default: () => ({}) })
  socialLinks: ISocialLinks;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ default: "" })
  experience: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);

TeamMemberSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret: any) => {
    ret.id = ret._id?.toString?.() || ret._id;
    delete ret._id;
  }
});
