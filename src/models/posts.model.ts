import { Field, ID, ObjectType, HideField } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType({ description: 'Posts Response' })
@Schema({ timestamps: true })
export class PostsModel extends Document {
  @Field((type) => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  title: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  content: string;

  @Field((type) => String)
  userId: MongooseSchema.Types.ObjectId;

  @Field((type) => String)
  categoryId: MongooseSchema.Types.ObjectId;

  @Field((type) => Date)
  createdAt: Date; // No need for @Prop decorator, handled by timestamps option

  @Field((type) => Date)
  updatedAt: Date;
}

export const PostsSchema = SchemaFactory.createForClass(PostsModel);
export type PostsDocument = PostsModel & Document;
