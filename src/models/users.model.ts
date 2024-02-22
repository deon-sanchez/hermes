import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PostsModel } from './posts.model';

@ObjectType({ description: 'Users Response' })
@Schema({ timestamps: true })
export class UsersModel {
  @Field((type) => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field((type) => String)
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @HideField()
  @Prop({ type: String, required: true })
  password: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  // @Prop({ type: [MongooseSchema.Types.ObjectId], ref: PostsModel.name })
  // posts: PostsModel[];
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
export type UsersDocument = UsersModel & Document;
