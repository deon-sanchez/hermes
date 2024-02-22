import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ description: 'Posts Response' })
@Schema({ timestamps: true }) // Enable automatic handling of createdAt and updatedAt
export class PostsModel {
  @Field((type) => String)
  @Prop({ type: String, required: true })
  _id: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  title: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  content: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  userId: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  categoryId: string;

  @Field((type) => Date)
  createdAt: Date; // No need for @Prop decorator, handled by timestamps option

  @Field((type) => Date)
  updatedAt: Date;
}

export const PostsSchema = SchemaFactory.createForClass(PostsModel);
export type PostsDocument = PostsModel & Document;
