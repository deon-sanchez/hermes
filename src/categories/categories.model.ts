import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Posts } from '../posts/posts.model';

@ObjectType()
@Schema({ timestamps: true })
export class Categories {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field()
  @Prop({ type: String })
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // @Field(() => [Posts])
  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Posts' }] })
  // posts: Posts[];
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
export type CategoriesDocument = Categories & Document;
