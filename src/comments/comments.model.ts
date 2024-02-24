import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Users } from '../users/users.model';
import { Posts } from '../posts/posts.model';

@ObjectType()
@Schema({ timestamps: true })
export class Comments {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  postId: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Users' }] })
  user: Users;

  @Field()
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Posts' }] })
  post: Posts;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
export type CommentsDocument = Comments & Document;
