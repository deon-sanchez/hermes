import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostsDocument = PostsModel & Document;

@ObjectType({ description: 'Posts Response' })
@Schema()
export class PostsModel extends Document {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  @Prop({ type: String })
  user: string;
}

export const PostsSchema = SchemaFactory.createForClass(PostsModel);
