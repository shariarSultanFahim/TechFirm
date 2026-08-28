import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

@Schema({ _id: false })
export class PostAuthor {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  avatar?: string;

  @Prop({ trim: true })
  role?: string;
}

export const PostAuthorSchema = SchemaFactory.createForClass(PostAuthor);

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
export class Post {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  slug: string;

  @Prop({ required: true, trim: true })
  excerpt: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true, trim: true })
  coverImage: string;

  @Prop({ required: true, trim: true, index: true })
  category: string;

  @Prop({ type: PostAuthorSchema, required: true })
  author: PostAuthor;

  @Prop({ default: Date.now, index: true })
  publishedAt: Date;

  @Prop({ default: true, index: true })
  isPublished: boolean;

  @Prop({ default: "5 min read", trim: true })
  readTime: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0 })
  commentsCount: number;

  createdAt: Date;
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
