import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = BlogModel & Document;

@ObjectType({ description: 'Blog Response' })
@Schema()
export class BlogModel extends Document {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  @Prop({ type: String })
  user: string;
}

export const BlogSchema = SchemaFactory.createForClass(BlogModel);
