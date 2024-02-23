import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Comments } from './comments.model';
import { Categories } from './categories.model';
import { Users } from './users.model';

@ObjectType({ description: 'Posts Response' })
@Schema({ timestamps: true })
export class Posts {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: true })
  title: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Users])
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Users' }] })
  users: Users[];

  @Field(() => [Comments])
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comments' }] })
  comments: Comments[];

  @Field(() => [Categories])
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Categories' }] })
  categories: Categories[];
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
export type PostsDocument = Posts & Document;
