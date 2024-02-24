import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Comments } from '../comments/comments.model';
import { Posts } from '../posts/posts.model';

@ObjectType()
@Schema({ timestamps: true })
export class Users {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  postId: MongooseSchema.Types.ObjectId;

  @Field()
  commentId: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ type: String, required: true })
  name: string;

  @Field()
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @HideField()
  @Prop({ type: String, required: true })
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // @Field()
  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comments' }] })
  // comments: Comments[];

  // @Field()
  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Posts' }] })
  // posts: Posts[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
export type UsersDocument = Users & Document;
