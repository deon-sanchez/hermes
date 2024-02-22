import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TimestampModel } from './timestamp.model';

@ObjectType({ description: 'Posts Response' })
@Schema({ timestamps: true })
export class PostsModel extends TimestampModel {
  @Field((type) => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  title: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  content: string;

  @Field((type) => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Field((type) => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  categoryId: MongooseSchema.Types.ObjectId;
}

export const PostsSchema = SchemaFactory.createForClass(PostsModel);
export type PostsDocument = PostsModel & Document;
