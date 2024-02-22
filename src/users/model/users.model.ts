import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ description: 'Users Response' })
@Schema({ timestamps: true })
export class UsersModel {
  @Field((type) => ID)
  @Prop({ type: String, required: true })
  _id: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  email: string;

  @HideField()
  @Prop({ type: String, required: true })
  password: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
export type UsersDocument = UsersModel & Document;
