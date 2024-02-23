import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Users } from './users.model';
// import { Posts } from './posts.model';

@ObjectType({ description: 'Comments Response' })
@Schema({ timestamps: true })
export class Comments {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

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

  // @Field(() => [Posts])
  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Posts' }] })
  // posts: Posts[];
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
export type CommentsDocument = Comments & Document;
