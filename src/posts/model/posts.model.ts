import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostsDocument = PostsModel & Document;

@ObjectType({ description: 'Posts Response' })
@Schema()
export class PostsModel extends Document {
  @Field((type) => String)
  @Prop({ type: String })
  _id: string;

  @Field((type) => String)
  @Prop({ type: String })
  title: string;

  @Field((type) => String)
  @Prop({ type: String })
  content: string;

  @Field((type) => String)
  @Prop({ type: String })
  userId: string;

  @Field((type) => String)
  @Prop({ type: String })
  categoryId: string;

  @Field((type) => String)
  @Prop({ type: String })
  createdAt: string;

  @Field((type) => String)
  @Prop({ type: String })
  updatedAt: string;
}

export const PostsSchema = SchemaFactory.createForClass(PostsModel);
