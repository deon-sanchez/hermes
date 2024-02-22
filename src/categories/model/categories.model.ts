import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoriesDocument = CategoriesModel & Document;

@ObjectType({ description: 'Categories Response' })
@Schema()
export class CategoriesModel extends Document {
  @Field((type) => String)
  @Prop({ type: String })
  _id: string;

  @Field((type) => String)
  @Prop({ type: String })
  name: string;

  @Field((type) => String)
  @Prop({ type: String })
  description: string;

  @Field((type) => String)
  @Prop({ type: String })
  createdAt: string;

  @Field((type) => String)
  @Prop({ type: String })
  updatedAt: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(CategoriesModel);
