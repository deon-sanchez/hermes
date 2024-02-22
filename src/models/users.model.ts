import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PostsModel } from './posts.model';
import { TimestampModel } from './timestamp.model';

@ObjectType({ description: 'Users Response' })
@Schema({ timestamps: true })
export class UsersModel extends TimestampModel {
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

  @Field((type) => [PostsModel], { nullable: true })
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: PostsModel.name }],
  })
  posts: PostsModel[];
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
export type UsersDocument = UsersModel & Document;
