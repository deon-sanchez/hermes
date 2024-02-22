import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = UsersModel & Document;

@ObjectType({ description: 'Users Response' })
@Schema()
export class UsersModel extends Document {
  @Field((type) => String)
  @Prop({ type: String })
  _id: string;

  @Field((type) => String)
  @Prop({ type: String })
  name: string;

  @Field((type) => String)
  @Prop({ type: String })
  email: string;

  @Field((type) => String)
  @Prop({ type: String })
  password: string;

  @Field((type) => String)
  @Prop({ type: String })
  createdAt: string;

  @Field((type) => String)
  @Prop({ type: String })
  updatedAt: string;
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
