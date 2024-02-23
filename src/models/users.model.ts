import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Blogs } from './blogs.model';

@ObjectType({ description: 'Users Response' })
@Schema({ timestamps: true })
export class Users {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field(() => String)
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @HideField()
  @Prop({ type: String, required: true })
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Blogs])
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Blogs' }] })
  blogs: Blogs[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
export type UsersDocument = Users & Document;
