import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

import { Comments } from '../comments/comments.model';
import { Categories } from '../categories/categories.model';
import { Users } from '../users/users.model';

@ObjectType()
@Schema({ timestamps: true })
export class Posts {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  categoryId: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  userId: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  content: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Users' }] })
  user: Users;

  @Field()
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comments' }] })
  comments: Comments[];

  @Field()
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Categories' }] })
  category: Categories;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
export type PostsDocument = Posts & Document;
