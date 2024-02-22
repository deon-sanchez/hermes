import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TimestampModel } from './timestamp.model';
import { PostsModel } from './posts.model';

@ObjectType({ description: 'Users Response' })
@Schema({ timestamps: true })
export class UsersModel extends TimestampModel {
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

  @Field(() => [PostsModel])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: PostsModel.name })
  posts: MongooseSchema.Types.ObjectId[] | PostsModel[];
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
export type UsersDocument = UsersModel & Document;
