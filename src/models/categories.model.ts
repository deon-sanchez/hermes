import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Blogs } from './blogs.model';

@ObjectType({ description: 'Categories Response' })
@Schema({ timestamps: true })
export class Categories {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  description: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Blogs])
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Blogs' }] })
  blogs: Blogs[];
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
export type CategoriesDocument = Categories & Document;
