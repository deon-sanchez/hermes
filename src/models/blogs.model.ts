import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Users } from './users.model';

@ObjectType({ description: 'Blogs Response' })
@Schema({ timestamps: true })
export class Blogs {
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
}

export const BlogsSchema = SchemaFactory.createForClass(Blogs);
export type BlogsDocument = Blogs & Document;
