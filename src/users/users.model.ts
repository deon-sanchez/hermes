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
  @Prop({ required: true })
  postId: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  commentId: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @HideField()
  @Prop({ required: true })
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
